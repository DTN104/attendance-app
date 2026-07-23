import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import { employeeRequests } from '@/data/requests';
import type { EmployeeRequest, NewEmployeeRequest } from '@/data/requests';
import { formatDate } from '@/utils/date';

type RequestsContextValue = {
  requests: EmployeeRequest[];
  saveDraft: (request: NewEmployeeRequest) => string;
  submitDraft: (id: string, attachment?: EmployeeRequest['attachment']) => void;
  submitRequest: (request: NewEmployeeRequest) => string;
};

const RequestsContext = createContext<RequestsContextValue | null>(null);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, setRequests] = useState(employeeRequests);

  const storeRequest = (request: NewEmployeeRequest, status: 'draft' | 'pending') => {
    const id = `${status === 'draft' ? 'DRAFT' : 'REQ'}-${Date.now()}`;
    const action = status === 'draft' ? 'Lưu nháp' : 'Tạo';
    setRequests((current) => [{ ...request, id, status, submittedAt: `${action} ngày ${formatDate(new Date())}` }, ...current]);
    return id;
  };

  const saveDraft = (request: NewEmployeeRequest) => storeRequest(request, 'draft');
  const submitDraft = (id: string, attachment?: EmployeeRequest['attachment']) => {
    setRequests((current) => current.map((request) => request.id === id && request.status === 'draft'
      ? { ...request, attachment, status: 'pending', submittedAt: `Tạo ngày ${formatDate(new Date())}` }
      : request));
  };
  const submitRequest = (request: NewEmployeeRequest) => storeRequest(request, 'pending');

  // ponytail: dữ liệu chỉ sống trong phiên; thay provider này bằng API khi cần lưu bền và xét duyệt thật.
  return <RequestsContext.Provider value={{ requests, saveDraft, submitDraft, submitRequest }}>{children}</RequestsContext.Provider>;
}

export function useRequests() {
  const value = useContext(RequestsContext);
  if (!value) throw new Error('useRequests must be used inside RequestsProvider');
  return value;
}
