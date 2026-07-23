import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { useAuth } from '@/context/AuthContext';
import type { EmployeeRequest, NewEmployeeRequest } from '@/data/requests';
import type { LocalAttachment } from '@/services/attachments';
import { uploadAttachment } from '@/services/attachments';
import {
  createRequestDraft,
  listRequestRecords,
  submitRequestDraft,
  toEmployeeRequest,
} from '@/services/requests';

type RequestsContextValue = {
  requests: EmployeeRequest[];
  saveDraft: (request: NewEmployeeRequest) => Promise<string>;
  submitDraft: (id: string, attachment?: LocalAttachment | null) => Promise<void>;
  submitRequest: (request: NewEmployeeRequest, attachment?: LocalAttachment | null) => Promise<string>;
};

const RequestsContext = createContext<RequestsContextValue | null>(null);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const { accessToken } = useAuth();
  const [requests, setRequests] = useState<EmployeeRequest[]>([]);

  useEffect(() => {
    if (!accessToken) {
      setRequests([]);
      return;
    }
    let active = true;
    listRequestRecords(accessToken)
      .then((records) => {
        if (active) setRequests(records.map((record) => toEmployeeRequest(record)));
      })
      .catch((error) => console.warn('Không tải được danh sách đơn:', error));
    return () => {
      active = false;
    };
  }, [accessToken]);

  const requireToken = () => {
    if (!accessToken) throw new Error('Vui lòng đăng nhập lại.');
    return accessToken;
  };

  const saveDraft = async (request: NewEmployeeRequest) => {
    const created = await createRequestDraft(requireToken(), request);
    setRequests((current) => [toEmployeeRequest(created, request.attachment as LocalAttachment | undefined), ...current]);
    return created.id;
  };

  const submitDraft = async (id: string, attachment?: LocalAttachment | null) => {
    const token = requireToken();
    const uploaded = attachment ? await uploadAttachment(attachment, id, token) : null;
    const submitted = await submitRequestDraft(token, id, uploaded ? [uploaded.id] : []);
    setRequests((current) => current.map((item) =>
      item.id === id ? toEmployeeRequest(submitted, attachment ?? undefined) : item));
  };

  const submitRequest = async (request: NewEmployeeRequest, attachment?: LocalAttachment | null) => {
    const token = requireToken();
    const created = await createRequestDraft(token, request);
    setRequests((current) => [toEmployeeRequest(created, attachment ?? undefined), ...current]);
    const uploaded = attachment ? await uploadAttachment(attachment, created.id, token) : null;
    const submitted = await submitRequestDraft(token, created.id, uploaded ? [uploaded.id] : []);
    setRequests((current) => current.map((item) =>
      item.id === created.id ? toEmployeeRequest(submitted, attachment ?? undefined) : item));
    return created.id;
  };

  return <RequestsContext.Provider value={{ requests, saveDraft, submitDraft, submitRequest }}>{children}</RequestsContext.Provider>;
}

export function useRequests() {
  const value = useContext(RequestsContext);
  if (!value) throw new Error('useRequests must be used inside RequestsProvider');
  return value;
}
