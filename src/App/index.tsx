import React, { useEffect, useCallback } from 'react';
import {
	Box,
	Button,
	Container,
	Drawer,
	Paper,
	Snackbar,
	Typography,
} from '@mui/material';
import { queryApi } from '../api';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import { EmployeeType, Person, PersonRole } from '../types';
import Table from './Table';
import { Filter } from './Filter';

function App() {
	const [rowSelectionModel, setRowSelectionModel] = React.useState<GridRowSelectionModel>(
		[]
	);
	const [search, setSearch] = React.useState<string>('');
	const [offset, setOffset] = React.useState<number>(0);
	const [pageSize, setPageSize] = React.useState<number>(10);
	const [role, setRole] = React.useState<PersonRole>('ANY');
	const [employeeType, setEmployeeType] = React.useState<EmployeeType>('ANY');
	const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
	const [items, setItems] = React.useState<Person[]>([]);
	const [count, setCount] = React.useState<number>(0);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

	const [sort, setSort] = React.useState<keyof Person | null>(null);
	const [sortDirection, setSortDirection] = React.useState<
		'asc' | 'desc' | null | undefined
	>(null);

	// Function to update the browser's query string with filter settings
	const updateQueryString = useCallback(() => {
		const params = new URLSearchParams();
		if (search) params.append('search', search);
		if (role !== 'ANY') params.append('role', role);
		if (employeeType !== 'ANY') params.append('employeeType', employeeType);
		if (offset !== 0) params.append('offset', String(offset));
		if (pageSize !== 10) params.append('pageSize', String(pageSize));
		if (sort) params.append('sort', sort);
		if (sortDirection) params.append('sortDirection', sortDirection);

		const queryString = params.toString();
		// Update the browser's URL with the query string
		window.history.replaceState(
			null,
			'',
			queryString ? '?' + queryString : window.location.pathname
		);
	}, [search, role, employeeType, offset, pageSize, sort, sortDirection]);

	// Initialize filter state from the browser's query string
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		setSearch(params.get('search') || '');
		setRole((params.get('role') as PersonRole) || 'ANY');
		setEmployeeType((params.get('employeeType') as EmployeeType) || 'ANY');
		setOffset(Number(params.get('offset')) || 0);
		setPageSize(Number(params.get('pageSize')) || 10);
		setSort((params.get('sort') as keyof Person) || null);
		setSortDirection((params.get('sortDirection') as 'asc' | 'desc') || null);
	}, []);

	// Update the browser's query string whenever filter settings change
	useEffect(() => {
		updateQueryString();
	}, [updateQueryString]);

	useEffect(() => {
		setShowDrawer(rowSelectionModel.length > 0);
	}, [rowSelectionModel]);

	useEffect(() => {
		setLoading(true);
		queryApi(search, role, employeeType, offset, pageSize, sort, sortDirection)
			.then(({ items, count }) => {
				setItems(items);
				setCount(count);
				setLoading(false);
			})
			.catch(() => setErrorMessage('There has been an error loading from the API.'));
	}, [search, role, employeeType, offset, pageSize, sort, sortDirection]);

	return (
		<Container>
			<Paper sx={{ p: 2 }}>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={errorMessage !== null}
					autoHideDuration={6000}
					onClose={() => setErrorMessage(null)}
					message={errorMessage}
				/>
				<Box>
					<Typography variant='h4'>Person Admin</Typography>
				</Box>
				<Filter
					{...{
						search,
						setSearch,
						role,
						setRole,
						employeeType,
						setEmployeeType,
					}}
				/>
				{/* Table component with props for handling server-side sorting, pagination and row selection.  */}
				<Table
					items={items}
					loading={loading}
					rowCount={count}
					pageSize={pageSize}
					rowSelectionModel={rowSelectionModel}
					setRowSelectionModel={setRowSelectionModel}
					setOffset={setOffset}
					setPageSize={setPageSize}
					// Passed the new sorting state and functions as props to the Table component.
					setSort={setSort}
					setSortDirection={setSortDirection}
					sort={sort}
					sortDirection={sortDirection}
				/>
				<Drawer
					anchor='bottom'
					open={showDrawer}
					onClose={setShowDrawer}
					hideBackdrop={true}
					variant='persistent'
				>
					<Box sx={{ bgcolor: 'black', p: 4, color: 'white' }}>
						<Button color='primary' onClick={() => setRowSelectionModel([])}>
							Export {rowSelectionModel.length} item(s) ➡️{' '}
						</Button>
					</Box>
				</Drawer>
			</Paper>
		</Container>
	);
}

export default App;
