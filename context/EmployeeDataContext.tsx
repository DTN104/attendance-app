import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { useAuth } from '@/context/AuthContext';
import {
  getDashboardToday,
  getEmployeeProfile,
  getRequestSummary,
} from '@/services/employee';
import type {
  DashboardToday,
  EmployeeProfile,
  RequestSummary,
} from '@/services/employee';

type EmployeeDataContextValue = {
  dashboard: DashboardToday | null;
  isLoading: boolean;
  profile: EmployeeProfile | null;
  requestSummary: RequestSummary | null;
};

const EmployeeDataContext = createContext<EmployeeDataContextValue | null>(null);

export function EmployeeDataProvider({ children }: { children: ReactNode }) {
  const { accessToken } = useAuth();
  const [dashboard, setDashboard] = useState<DashboardToday | null>(null);
  const [profile, setProfile] = useState<EmployeeProfile | null>(null);
  const [requestSummary, setRequestSummary] = useState<RequestSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setDashboard(null);
      setProfile(null);
      setRequestSummary(null);
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);

    Promise.all([
      getEmployeeProfile(accessToken),
      getDashboardToday(accessToken),
      getRequestSummary(accessToken),
    ])
      .then(([nextProfile, nextDashboard, nextRequestSummary]) => {
        if (!active) return;
        setProfile(nextProfile);
        setDashboard(nextDashboard);
        setRequestSummary(nextRequestSummary);
      })
      .catch((error) => console.warn('Không tải được dữ liệu nhân viên:', error))
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [accessToken]);

  return (
    <EmployeeDataContext.Provider value={{ dashboard, isLoading, profile, requestSummary }}>
      {children}
    </EmployeeDataContext.Provider>
  );
}

export function useEmployeeData() {
  const value = useContext(EmployeeDataContext);
  if (!value) throw new Error('useEmployeeData must be used inside EmployeeDataProvider');
  return value;
}
