## Task 2 - Bug Fixing
### Bug Description
- In the Filter component, if the Role is set to "Employee", and then Employee Type is set, switching the Role back to "Student" did not reset the Employee Type.
### Resolution
- Added a useEffect hook in `src/App/Filter.tsx` to monitor the `role` prop. When `role` changes to "STUDENT", `setEmployeeType` is called to reset `employeeType` to "ANY".
### Files Modified
- `src/App/Filter.tsx`

---------------------------------------------------------------------------------------------

## Task 3 - Adding Email Column
### Change Description
- Added an Email column to the data grid to display the email address of each person.
### Implementation Details
- Updated the `columns` constant array in `src/App/Table.tsx` to include a new object for the Email column.
### Files Modified
- `src/App/Table.tsx`

---------------------------------------------------------------------------------------------


## Task 4 - Implement Server-side Sorting
### Change Description
- Implemented server-side sorting for the data grid.
### Implementation Details
#### Added new props to TableProps interface to manage sorting:
- `sort: keyof Person | null;`
- `sortDirection: 'asc' | 'desc' | null;`
- `setSort: React.Dispatch<React.SetStateAction<keyof Person | null>>;`
- `setSortDirection: React.Dispatch<React.SetStateAction<'asc' | 'desc' | null>>;`
#### Defined a handler function `handleSortModelChange` to update the sorting state based on user interaction:
- `handleSortModelChange` - A handler function to update the sorting state when the user interacts with the column headers to sort the data.
```const handleSortModelChange = (model: GridSortModel) => {
  const newSort = model[0]?.field as keyof Person | null;
  const newSortDirection = model[0]?.sort as 'asc' | 'desc' | null;
  setSort(newSort);
  setSortDirection(newSortDirection);
};
```

#### Created a `sortModel` constant to store the current sort model:
- `sortModel` - The current sort model, which determines the field and direction of the sorting applied to the DataGrid.
```const sortModel = [
  {
    field: sort || 'id',
    sort: sortDirection || 'asc',
  },
];
```
#### Updated DataGrid component within `Table.tsx` to accept new props related to sorting, and set the `sortingMode` to 'server' to enable server-side sorting:
```sortModel={sortModel} // The current sort model, which determines the field and direction of the sorting applied to the DataGrid.
onSortModelChange={handleSortModelChange} // A handler function to update the sorting state when the user interacts with the column headers to sort the data.
sortingMode='server' // The sorting mode of the grid.
```
#### Passed down the required props to `Table` component in `App.tsx` for handling server-side sorting:
```setSort={setSort}
setSortDirection={setSortDirection}
sort={sort}
sortDirection={sortDirection}
```
### Files Modified
- `src/App/Table.tsx`
- `src/App/index.tsx` (to manage the sorting state and pass down the required props to `Table` component)
After changing search query or filters, at the moment the location bar address does not change. It would be much better from a user's point of view to be able to capture all the query variables (search, role, employeeType, offset, pageSize, sort, sortDirection) so that URLs can be bookmarked and shared. The URL does not need to record UI state such as which items are selected.
Add code to update the browser query string when a change in filter state is made, and that when the page loads, if filter info is present in the browser query string, the filter loads in this state correctly when it initializes.


---------------------------------------------------------------------------------------------

## Task 5 - Update Browser Query String and Initialize Filter State
### Change Description
- The goal is to ensure that the browser's query string reflects the current filter state and that this state is utilized to initialize the filter on page load. This way, URLs with specific filter states can be bookmarked and shared.
### Implementation Details
#### 1. Importing Dependencies:
- Necessary dependencies are imported at the beginning of the file.
#### 2. `updateQueryString` Function:
- A function `updateQueryString` is defined using the `useCallback` hook to update the browser's query string based on the current filter state. This function creates a new `URLSearchParams` object, sets the necessary parameters, and updates the browser's history using `window.history.replaceState`.
#### 3. Initializing Filter State from Query String:
- A `useEffect` hook is utilized to initialize the filter state from the browser's query string when the page loads. The `URLSearchParams` object is used to extract the values of the relevant parameters from the query string, and the state is updated accordingly.
#### 4. Updating Query String on State Change:
- Another `useEffect` hook is used to call `updateQueryString` whenever any relevant filter state changes, ensuring that the browser's query string is updated to reflect the current state.
#### 5. Passing State and Dispatch Functions to Components:
- The necessary state and dispatch functions are passed down as props to the `Filter` and `Table` components, allowing them to interact with and update the filter state.
### Files Modified
- `src/App/index.tsx` (to manage the query string updates and initialize the filter state from the query string).
This implementation ensures a robust synchronization between the browser's query string and the application's filter state, providing a user-friendly experience by enabling bookmarkable and shareable URLs with specific filter states.

---------------------------------------------------------------------------------------------

## Task 5 Alternative - Integrating react-router-dom for URL Management
### Change Description
- Integrated `react-router-dom` to manage the URL parameters and enable routing within the application
### Implementation Details
#### 1. Importing Dependencies:
- Imported `react-router-dom` dependencies at the beginning of the file.
#### 2. Router Wrapping:
- Wrapped the `App` component with `BrowserRouter` (aliased as `Router`) to provide routing capabilities.
Utilizing useSearchParams Hook:
- Utilized the `useSearchParams` hook to access the query string parameters and update them as necessary.
[useSearchParams](https://reactrouter.com/en/main/hooks/use-search-params)
#### 3. Initializing Filter State from Query String:
- Utilized useSearchParams hook from react-router-dom to manage URL parameters. 
const [searchParams, setSearchParams] = useSearchParams();
. Initializing and Updating Query String:
Implemented two useEffect hooks to handle initialization of state from URL parameters on first render, and to update the URL query parameters based on state changes.
### Files Modified
- `src/App/index.tsx` (to manage the query string updates and initialize the filter state from the query string).

---------------------------------------------------------------------------------------------

## Bonus Task - Server-side Persistence:
### Change Description
- Implemented server-side persistence to store and retrieve data on the server.
### Implementation Details
#### 1. Import Data Mutator
- Imported `mutateData` function from `from '../api';` module to mutate data on the server.
#### 2. Data Editing Handler
- Defined a handler function `handleEditRow` to update the data on the server when the user edits a row in the data grid.
```const handleRowUpdate = async (newRow: Person): Promise<Person> => {
	await mutateApi(newRow.id, newRow);
	return newRow;
};
```
- Utilize the `processRowUpdate` prop which invokes the `handleEditRow`
[processRowUpdate](https://mui.com/x/react-data-grid/editing/#the-processrowupdate-callback)


---------------------------------------------------------------------------------------------

