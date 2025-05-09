'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type DashboardContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeSettingsTab: string;
  setActiveSettingsTab: (tab: string) => void;
};

const DashboardContext = createContext<DashboardContextType>({
  activeTab: 'dashboard',
  setActiveTab: () => {},
  activeSettingsTab: '',
  setActiveSettingsTab: () => {},
});

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeSettingsTab, setActiveSettingsTab] = useState('user-list');

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab,
        activeSettingsTab,
        setActiveSettingsTab,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  return context;
}
