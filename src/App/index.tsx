import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
	const [searchParams, setSearchParams] = useSearchParams(); // Custom hook from react-router-dom to manage URL parameters

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

	// // useEffect hook to initialize state from URL parameters on first render
	useEffect(() => {
		// Creating an instance of URLSearchParams to parse the query string
		const params = new URLSearchParams(window.location.search);
		// Setting state variables based on URL parameters, or default values if parameters are not present
		setSearch(params.get('search') || '');
		setRole((params.get('role') as PersonRole) || 'ANY');
		setEmployeeType((params.get('employeeType') as EmployeeType) || 'ANY');
		setOffset(Number(params.get('offset')) || 0);
		setPageSize(Number(params.get('pageSize')) || 10);
		setSort((params.get('sort') as keyof Person) || null);
		setSortDirection((params.get('sortDirection') as 'asc' | 'desc' | null) || null);
	}, []); // Empty dependency array means this useEffect runs once

	// useEffect hook to update the URL query parameters from the state
	useEffect(() => {
		// Updating URL parameters to reflect current state
		searchParams.set('search', search);
		searchParams.set('role', role);
		searchParams.set('employeeType', employeeType);
		searchParams.set('offset', offset.toString());
		searchParams.set('pageSize', pageSize.toString());
		// Conditionally setting or deleting sort and sortDirection parameters based on their values
		if (sort && sortDirection) {
			searchParams.set('sort', sort);
			searchParams.set('sortDirection', sortDirection);
		} else {
			searchParams.delete('sort');
			searchParams.delete('sortDirection');
		}
		setSearchParams(searchParams, { replace: true });
	}, [
		search,
		role,
		employeeType,
		offset,
		pageSize,
		sort,
		sortDirection,
		searchParams,
		setSearchParams,
	]);

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
