/**
 * Table Component
 *
 * This component renders the data grid that displays the list of Persons.
 * It supports pagination, selection, and now includes an Email column for each person.
 */
import React from 'react';
import {
	DataGrid,
	GridColDef,
	GridRowSelectionModel,
	GridSortModel,
} from '@mui/x-data-grid';
import { Person } from '../types';
import { Box } from '@mui/material';

interface TableProps {
	items: Person[];
	rowCount: number;
	loading: boolean;
	pageSize: number;
	rowSelectionModel: GridRowSelectionModel;
	sort: keyof Person | null;
	sortDirection: 'asc' | 'desc' | null | undefined;
	setRowSelectionModel: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
	setOffset: React.Dispatch<React.SetStateAction<number>>;
	setSort: React.Dispatch<React.SetStateAction<keyof Person | null>>;
	setSortDirection: React.Dispatch<
		React.SetStateAction<'asc' | 'desc' | null | undefined>
	>;
}

export default function Table(props: TableProps) {
	const {
		items,
		loading,
		rowCount,
		pageSize,
		rowSelectionModel,
		sort,
		sortDirection,
		setRowSelectionModel,
		setPageSize,
		setOffset,
		setSort,
		setSortDirection,
	} = props;
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 70 },
		{
			field: 'firstName',
			headerName: 'First Name',
			width: 150,
			editable: true,
		},
		{ field: 'lastName', headerName: 'Last Name', width: 150, editable: true },
		{
			field: 'email',
			headerName: 'Email',
			width: 200,
			editable: true,
			// Added Email column to display each person's email address
		},
		{
			field: 'role',
			headerName: 'Role',
			width: 150,
			editable: true,
			type: 'singleSelect',
			valueOptions: ['STUDENT', 'EMPLOYEE'],
		},
		{
			field: 'employeeType',
			headerName: 'Employee Type',
			width: 150,
			editable: true,
			type: 'singleSelect',
			valueOptions: ['FULL_TIME', 'PART_TIME'],
		},
	];

	// handleSortModelChange - A handler function to update the sorting state when the user interacts with the column headers to sort the data.
	const handleSortModelChange = (model: GridSortModel) => {
		const newSort = model[0]?.field as keyof Person | null;
		const newSortDirection = model[0]?.sort as 'asc' | 'desc' | null;
		setSort(newSort);
		setSortDirection(newSortDirection);
	};

	// sortModel - The current sort model, which determines the field and direction of the sorting applied to the DataGrid.
	const sortModel = [
		{
			field: sort || 'id',
			sort: sortDirection || 'asc',
		},
	];

	return (
		<Box mb={10}>
			<DataGrid<Person>
				rows={items}
				columns={columns}
				isCellEditable={() => false}
				loading={loading}
				disableColumnFilter
				disableRowSelectionOnClick
				paginationMode='server'
				rowCount={rowCount}
				initialState={{
					pagination: { paginationModel: { pageSize } },
				}}
				pageSizeOptions={[10, 20, 50]}
				onPaginationModelChange={({ page, pageSize }) => {
					setPageSize(pageSize);
					setOffset(pageSize * page);
				}}
				checkboxSelection={true}
				rowSelectionModel={rowSelectionModel}
				onRowSelectionModelChange={(newRowSelectionModel) => {
					setRowSelectionModel(newRowSelectionModel);
				}}
				sortModel={sortModel} // The current sort model, which determines the field and direction of the sorting applied to the DataGrid.
				onSortModelChange={handleSortModelChange} // A handler function to update the sorting state when the user interacts with the column headers to sort the data.
				sortingMode='server' // The sorting mode of the grid.
			/>
		</Box>
	);
}
