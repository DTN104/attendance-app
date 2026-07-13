import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import { employeeRequests } from '@/data/requests';
import type { EmployeeRequest, NewEmployeeRequest } from '@/data/requests';
import { formatDate } from '@/utils/date';

type RequestsContextValue = {
  requests: EmployeeRequest[];
  submitRequest: (request: NewEmployeeRequest) => string;
};

const RequestsContext = createContext<RequestsContextValue | null>(null);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState(employeeRequests);

  const submitRequest = (request: NewEmployeeRequest) => {
    const id = `REQ-${Date.now()}`;
    setRequests((current) => [{ ...request, id, status: 'pending', submittedAt: `Tạo ngày ${formatDate(new Date())}` }, ...current]);
    return id;
  };

  // ponytail: dữ liệu chỉ sống trong phiên; thay provider này bằng API khi cần lưu bền và xét duyệt thật.
  return <RequestsContext.Provider value={{ requests, submitRequest }}>{children}</RequestsContext.Provider>;
}

export function useRequests() {
  const value = useContext(RequestsContext);
  if (!value) throw new Error('useRequests must be used inside RequestsProvider');
  return value;
}
