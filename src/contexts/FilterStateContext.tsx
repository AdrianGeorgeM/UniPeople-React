import React, { createContext, useContext, useState } from 'react';
import { EmployeeType, Person, PersonRole } from '../types';

interface FilterStateContextProps {
	search: string;
	role: PersonRole;
	employeeType: EmployeeType;
	offset: number;
	pageSize: number;
	sort: keyof Person | null;
	sortDirection: 'asc' | 'desc' | null | undefined;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setRole: React.Dispatch<React.SetStateAction<PersonRole>>;
	setEmployeeType: React.Dispatch<React.SetStateAction<EmployeeType>>;
	setOffset: React.Dispatch<React.SetStateAction<number>>;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
	setSort: React.Dispatch<React.SetStateAction<keyof Person | null>>;
	setSortDirection: React.Dispatch<
		React.SetStateAction<'asc' | 'desc' | null | undefined>
	>;
}
interface FilterStateProviderProps {
	children: React.ReactNode;
}

export const FilterStateContext = createContext<FilterStateContextProps | undefined>(
	undefined
);

export const FilterStateProvider: React.FC<FilterStateProviderProps> = ({ children }) => {
	const [search, setSearch] = useState<string>('');
	const [role, setRole] = useState<PersonRole>('ANY');
	const [employeeType, setEmployeeType] = useState<EmployeeType>('ANY');
	const [offset, setOffset] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [sort, setSort] = useState<keyof Person | null>(null);
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null | undefined>(
		null
	);

	return (
		<FilterStateContext.Provider
			value={{
				search,
				role,
				employeeType,
				offset,
				pageSize,
				sort,
				sortDirection,
				setSearch,
				setRole,
				setEmployeeType,
				setOffset,
				setPageSize,
				setSort,
				setSortDirection,
			}}
		>
			{children}
		</FilterStateContext.Provider>
	);
};

export const useFilterState = (): FilterStateContextProps => {
	const context = useContext(FilterStateContext);
	if (!context) {
		throw new Error('useFilterState must be used within a FilterStateProvider');
	}
	return context;
};
