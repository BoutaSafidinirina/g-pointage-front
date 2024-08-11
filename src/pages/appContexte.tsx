import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface LocalStorageContextType {
    searchValue: string;
    setSearchValue: (value: string) => void;
    filter : string;
    setFilter: (value: string) => void;
    authData: any | null;
    setAuthData: (data: any | null) => void;
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined);
interface LocalStorageProviderProps {
    children: ReactNode;
}

export const LocalStorageProvider: React.FC<LocalStorageProviderProps> = ({ children }) => {
    const [authData, setAuthData] = useState<any | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [filter, setFilter] = useState<string>('');

    const val = localStorage.getItem('userData');
	useEffect(() => {
		if(val){
			const userData = JSON.parse(val);
			setAuthData(userData);
		}
	}, []);
    return (
        <LocalStorageContext.Provider value={{ authData,  searchValue,filter,setFilter,setAuthData , setSearchValue}}>
            {children}
        </LocalStorageContext.Provider>
    );
};

export const useLocalStorage = (): LocalStorageContextType => {
    const context = useContext(LocalStorageContext);
    if (!context) {
        throw new Error('useLocalStorage must be used within a LocalStorageProvider');
    }
    return context;
};
