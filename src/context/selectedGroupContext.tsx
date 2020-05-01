import React, { useState, createContext, useContext } from 'react';
interface Props {
  children: React.ReactNode;
}
interface selectegGroupInterface {
  selectedGroup: string | null;
  updateSelectedGroup: any;
}

export const selectedGroupContext = createContext<selectegGroupInterface>({
  selectedGroup: null,
  updateSelectedGroup: null,
});
export const SelectedGroupProvider = ({ children }: Props) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const update = (group: string) => {
    setSelectedGroup(() => group);
  };

  return (
    <selectedGroupContext.Provider
      value={{
        selectedGroup: selectedGroup,
        updateSelectedGroup: update,
      }}
    >
      {children}
    </selectedGroupContext.Provider>
  );
};

export const useSelectedGroupContext = () => useContext(selectedGroupContext);
