import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DemoState, Scenario, Page } from '../types';
import { generateMockData } from '../lib/mock-data';
import { toast } from 'sonner';

interface DemoContextType {
  state: DemoState;
  setScenario: (scenario: Scenario) => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scenario, setScenarioState] = useState<Scenario>('normal');
  const [state, setState] = useState<DemoState>(generateMockData('normal'));
  const [currentPage, setCurrentPage] = useState<Page>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setState(generateMockData(scenario));
  }, [scenario]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const setScenario = (newScenario: Scenario) => {
    setScenarioState(newScenario);
    toast.info(`Scenario changed: ${newScenario.replace('-', ' ')}`, {
      description: `Data has been updated to reflect the ${newScenario} state.`,
    });
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <DemoContext.Provider value={{ state, setScenario, currentPage, setCurrentPage, theme, toggleTheme }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
