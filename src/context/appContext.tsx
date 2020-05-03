import { createContext, useContext } from 'react';

export const AppSettingsContext = createContext<any | null>(null);

export const useAppsettingsContext = () => useContext(AppSettingsContext);
