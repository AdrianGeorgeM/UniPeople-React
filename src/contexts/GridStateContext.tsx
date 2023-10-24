import React, { createContext, useContext, useState } from 'react';
import { Person } from '../types';

interface GridStateContextProps {
	items: Person[];
	count: number;
	setItems: React.Dispatch<React.SetStateAction<Person[]>>;
	setCount: React.Dispatch<React.SetStateAction<number>>;
}
interface GridStateProviderProps {
	children: React.ReactNode;
}

export const GridStateContext = createContext<GridStateContextProps | undefined>(
	undefined
);

export const GridStateProvider: React.FC<GridStateProviderProps> = ({ children }) => {
	const [items, setItems] = useState<Person[]>([]);
	const [count, setCount] = useState<number>(0);

	return (
		<GridStateContext.Provider value={{ items, count, setItems, setCount }}>
			{children}
		</GridStateContext.Provider>
	);
};

export const useGridState = (): GridStateContextProps => {
	const context = useContext(GridStateContext);
	if (!context) {
		throw new Error('useGridState must be used within a GridStateProvider');
	}
	return context;
};
