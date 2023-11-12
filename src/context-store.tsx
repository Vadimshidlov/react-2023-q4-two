import React, { createContext, useMemo, useState } from 'react';
import { PeopleRequestType } from '@/components/Search/types.ts';

export type ContextDataStorePropsType = { children: React.ReactNode };

export type ContextDataType = {
  searchData: PeopleRequestType[];
  searchValue: string;
  currentPage: number;
  isLoading: boolean;
  isLoadingDetails: boolean;
  isShowDetails: boolean;
};

export type AuthContextType = {
  contextData: ContextDataType;
  setContextData: React.Dispatch<React.SetStateAction<ContextDataType>>;
};

export const ContextDataStore = createContext<AuthContextType | undefined>(undefined);

function ContextDataStoreProvider({ children }: ContextDataStorePropsType) {
  const [contextData, setContextData] = useState<ContextDataType>({
    searchData: [],
    searchValue: localStorage.getItem('searchValue') || '',
    currentPage: 1,
    isLoading: false,
    isLoadingDetails: false,
    isShowDetails: false,
  });

  const value = useMemo(
    () => ({
      contextData,
      setContextData,
    }),
    [contextData]
  );

  return <ContextDataStore.Provider value={value}>{children}</ContextDataStore.Provider>;
}

function useContextData() {
  const context = React.useContext(ContextDataStore);

  if (!context) {
    throw new Error('ContextDataStore must be used within ContextProvider');
  }

  return context;
}

export { ContextDataStoreProvider, useContextData };
