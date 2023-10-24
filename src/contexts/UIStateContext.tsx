import React, { createContext, useContext, useState } from 'react';
import { GridRowSelectionModel } from '@mui/x-data-grid';

interface UIStateContextProps {
	loading: boolean;
	errorMessage: string | null;
	showDrawer: boolean;
	rowSelectionModel: GridRowSelectionModel;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
	setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>;
	setRowSelectionModel: React.Dispatch<React.SetStateAction<GridRowSelectionModel>>;
}
interface UIStateProviderProps {
	children: React.ReactNode;
}

export const UIStateContext = createContext<UIStateContextProps | undefined>(undefined);

export const UIStateProvider: React.FC<UIStateProviderProps> = ({ children }) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [showDrawer, setShowDrawer] = useState<boolean>(false);
	const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

	return (
		<UIStateContext.Provider
			value={{
				loading,
				errorMessage,
				showDrawer,
				rowSelectionModel,
				setLoading,
				setErrorMessage,
				setShowDrawer,
				setRowSelectionModel,
			}}
		>
			{children}
		</UIStateContext.Provider>
	);
};

export const useUIState = (): UIStateContextProps => {
	const context = useContext(UIStateContext);
	if (!context) {
		throw new Error('useUIState must be used within a UIStateProvider');
	}
	return context;
};
