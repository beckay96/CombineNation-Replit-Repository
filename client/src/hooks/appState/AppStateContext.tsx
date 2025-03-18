import { createContext, useContext, ReactNode, useState } from 'react';

interface AppState {
  isAddingFamily: boolean;
  isAddingSchool: boolean;
  familyFinishedAdding: boolean;
  schoolCreatedFully: boolean;
  setIsAddingFamily: (value: boolean) => void;
  setIsAddingSchool: (value: boolean) => void;
  setFamilyFinishedAdding: (value: boolean) => void;
  setSchoolCreatedFully: (value: boolean) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isAddingFamily, setIsAddingFamily] = useState(false);
  const [isAddingSchool, setIsAddingSchool] = useState(false);
  const [familyFinishedAdding, setFamilyFinishedAdding] = useState(false);
  const [schoolCreatedFully, setSchoolCreatedFully] = useState(false);

  return (
    <AppStateContext.Provider
      value={{
        isAddingFamily,
        isAddingSchool,
        familyFinishedAdding,
        schoolCreatedFully,
        setIsAddingFamily,
        setIsAddingSchool,
        setFamilyFinishedAdding,
        setSchoolCreatedFully,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
