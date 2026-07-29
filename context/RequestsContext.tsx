import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { useAuth } from '@/context/AuthContext';
import type { EmployeeRequest, NewEmployeeRequest, RequestAttachment } from '@/data/requests';
import { isLocalAttachment, toStoredAttachment, uploadAttachment } from '@/services/attachments';
import {
  createRequestDraft,
  listRequestRecords,
  submitRequestDraft,
  toEmployeeRequest,
  updateRequestDraft,
} from '@/services/requests';

type RequestsContextValue = {
  requests: EmployeeRequest[];
  saveDraft: (request: NewEmployeeRequest) => Promise<string>;
  updateDraft: (id: string, request: NewEmployeeRequest) => Promise<RequestAttachment | undefined>;
  submitDraft: (id: string, attachment?: RequestAttachment | null) => Promise<void>;
  submitRequest: (request: NewEmployeeRequest, attachment?: RequestAttachment | null) => Promise<string>;
};

export class DraftCreatedError extends Error {
  constructor(message: string, readonly draftId: string) {
    super(message);
  }
}

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
    const token = requireToken();
    const created = await createRequestDraft(token, request);
    setRequests((current) => [toEmployeeRequest(created, request.attachment), ...current]);

    try {
      const attachment = await persistAttachment(request.attachment, created.id, token);
      if (attachment !== request.attachment) {
        const updated = await updateRequestDraft(token, created.id, { ...request, attachment });
        setRequests((current) => current.map((item) =>
          item.id === created.id ? toEmployeeRequest(updated, attachment) : item));
      }
      return created.id;
    } catch (error) {
      throw new DraftCreatedError(errorMessage(error), created.id);
    }
  };

  const updateDraft = async (id: string, request: NewEmployeeRequest) => {
    const token = requireToken();
    const attachment = await persistAttachment(request.attachment, id, token);
    const updated = await updateRequestDraft(token, id, { ...request, attachment });
    setRequests((current) => current.map((item) =>
      item.id === id ? toEmployeeRequest(updated, attachment) : item));
    return attachment;
  };

  const submitDraft = async (id: string, attachment?: RequestAttachment | null) => {
    const token = requireToken();
    const submitted = await submitRequestDraft(token, id, attachment?.id ? [attachment.id] : []);
    setRequests((current) => current.map((item) =>
      item.id === id ? toEmployeeRequest(submitted, attachment ?? undefined) : item));
  };

  const submitRequest = async (request: NewEmployeeRequest, attachment?: RequestAttachment | null) => {
    const token = requireToken();
    const created = await createRequestDraft(token, request);
    setRequests((current) => [toEmployeeRequest(created, attachment ?? undefined), ...current]);

    try {
      const storedAttachment = await persistAttachment(attachment, created.id, token);
      if (storedAttachment !== attachment) {
        await updateRequestDraft(token, created.id, { ...request, attachment: storedAttachment });
      }
      const submitted = await submitRequestDraft(token, created.id, storedAttachment?.id ? [storedAttachment.id] : []);
      setRequests((current) => current.map((item) =>
        item.id === created.id ? toEmployeeRequest(submitted, storedAttachment) : item));
      return created.id;
    } catch (error) {
      throw new DraftCreatedError(errorMessage(error), created.id);
    }
  };

  return <RequestsContext.Provider value={{ requests, saveDraft, submitDraft, submitRequest, updateDraft }}>{children}</RequestsContext.Provider>;
}

async function persistAttachment(
  attachment: RequestAttachment | null | undefined,
  requestId: string,
  accessToken: string,
) {
  if (!attachment || !isLocalAttachment(attachment)) return attachment ?? undefined;
  return toStoredAttachment(attachment, await uploadAttachment(attachment, requestId, accessToken));
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'Không thể tải tệp đính kèm.';
}

export function useRequests() {
  const value = useContext(RequestsContext);
  if (!value) throw new Error('useRequests must be used inside RequestsProvider');
  return value;
}
