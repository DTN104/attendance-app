import { apiRequest } from '@/services/api';

export type EmployeeProfile = {
  id: string;
  employeeCode: string;
  name: string;
  email: string;
  role: 'employee' | 'manager';
  jobTitle: string;
  company: string;
  department: string;
  manager: { id: string; name: string } | null;
};

export type DashboardToday = {
  date: string;
  attendanceStatus: 'not_checked_in' | 'working' | 'completed';
  checkInAt: string | null;
  checkOutAt: string | null;
  workedMinutes: number;
  shift: {
    name: string;
    startTime: string;
    endTime: string;
  };
  monthlyStats: {
    workingDays: number;
    targetWorkingDays: number;
    lateCount: number;
    overtimeHours: number;
  };
};

export type RequestSummary = {
  annualLeaveDays: number;
  leaveUsed: number;
  leaveRemaining: number;
  overtimeHours: number;
  month: string;
};

export function getEmployeeProfile(accessToken: string) {
  return apiRequest<EmployeeProfile>('/me', { accessToken });
}

export function getDashboardToday(accessToken: string) {
  return apiRequest<DashboardToday>('/dashboard/today', { accessToken });
}

export function getRequestSummary(accessToken: string) {
  return apiRequest<RequestSummary>('/requests/summary', { accessToken });
}
