import React, { useState, createContext, useContext } from 'react';
interface Props {
  children: React.ReactNode;
}

export const AppSettingsContext = createContext<any | null>(null);
// export const AppSettingsContextProvider = ({ children }: Props) => {
//   const [appSettings, setAppSettings] = useState<any | null>(null);

//   return (
//     <AppSettingsContext.Provider value={null}>
//       {children}
//     </AppSettingsContext.Provider>
//   );
// };

export const useAppsettingsContext = () => useContext(AppSettingsContext);
