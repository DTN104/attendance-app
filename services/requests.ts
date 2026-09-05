import type {
  EmployeeRequest,
  NewEmployeeRequest,
  RequestAttachment,
  RequestDetail,
  RequestPayload,
  RequestStatus,
  RequestTypeId,
} from '@/data/requests';
import { apiRequest } from '@/services/api';

export type ApiRequestRecord = {
  attachmentId: string | null;
  createdAt: string;
  id: string;
  localAttachment: Omit<RequestAttachment, 'id' | 'objectKey' | 'uri'> | null;
  payload: RequestPayload;
  status: RequestStatus;
  submittedAt: string | null;
  type: RequestTypeId;
  updatedAt: string;
};

export async function createRequestDraft(accessToken: string, request: NewEmployeeRequest) {
  return apiRequest<ApiRequestRecord>('/requests', {
    accessToken,
    body: JSON.stringify(requestBody(request)),
    method: 'POST',
  });
}

export async function updateRequestDraft(accessToken: string, id: string, request: NewEmployeeRequest) {
  return apiRequest<ApiRequestRecord>(`/requests/${id}`, {
    accessToken,
    body: JSON.stringify(updateBody(request)),
    method: 'PATCH',
  });
}

export async function listRequestRecords(accessToken: string) {
  const result = await apiRequest<{ items: ApiRequestRecord[] }>('/requests', { accessToken });
  return result.items;
}

export function submitRequestDraft(
  accessToken: string,
  requestId: string,
  attachmentIds: string[],
) {
  return apiRequest<ApiRequestRecord>(`/requests/${requestId}/submit`, {
    accessToken,
    body: JSON.stringify({ attachmentIds }),
    headers: { 'Idempotency-Key': idempotencyKey(requestId) },
    method: 'POST',
  });
}

export function toEmployeeRequest(
  record: ApiRequestRecord,
  attachment?: RequestAttachment,
): EmployeeRequest {
  const display = requestDisplay(record.type, record.payload);
  const timestamp = record.submittedAt ?? record.updatedAt;
  return {
    ...display,
    attachment: attachment ?? (record.localAttachment
      ? { ...record.localAttachment, ...(record.attachmentId ? { id: record.attachmentId } : {}) }
      : undefined),
    id: record.id,
    payload: record.payload,
    status: record.status,
    submittedAt: `${record.status === 'draft' ? 'Lưu nháp' : 'Tạo'} ngày ${new Date(timestamp).toLocaleDateString('vi-VN')}`,
    type: record.type,
  };
}

function requestDisplay(type: RequestTypeId, payload: RequestPayload) {
  if (type === 'leave') {
    const title = payload.leaveType === 'annual' ? 'Nghỉ phép năm' : 'Đơn nghỉ phép';
    return {
      title,
      period: `${date(payload.startDate)} - ${date(payload.endDate)}`,
      details: [
        detail('Loại nghỉ', title),
        detail('Thời gian', `${date(payload.startDate)} - ${date(payload.endDate)}`),
        detail('Lý do', payload.reason),
      ],
    };
  }
  if (type === 'overtime') {
    return {
      title: 'Tăng ca ngày thường',
      period: `${date(payload.date)} · ${payload.startTime ?? ''} - ${payload.endTime ?? ''}`,
      details: [
        detail('Loại tăng ca', 'Tăng ca ngày thường'),
        detail('Ngày tăng ca', date(payload.date)),
        detail('Khung giờ', `${payload.startTime ?? ''} - ${payload.endTime ?? ''}`),
        detail('Nội dung công việc', payload.workContent),
      ],
    };
  }
  if (type === 'business') {
    return {
      title: `Công tác ${payload.location ?? ''}`.trim(),
      period: `${date(payload.startDate)} - ${date(payload.endDate)}`,
      details: [
        detail('Địa điểm', payload.location),
        detail('Thời gian', `${date(payload.startDate)} - ${date(payload.endDate)}`),
        detail('Mục đích công tác', payload.purpose),
      ],
    };
  }
  return {
    title: 'Bổ sung check-out',
    period: `${date(payload.date)} · Check-out ${payload.proposedTime ?? ''}`,
    details: [
      detail('Loại điều chỉnh', 'Bổ sung check-out'),
      detail('Ngày điều chỉnh', date(payload.date)),
      detail('Giờ đề nghị', payload.proposedTime),
      detail('Lý do', payload.reason),
    ],
  };
}

function detail(label: string, value?: string): RequestDetail {
  return { label, value: value ?? '' };
}

function date(value?: string) {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  return day && month && year ? `${day}/${month}/${year}` : value;
}

/**
 * Body cho POST /requests. Theo API_FLOW_SPEC 4.4, endpoint tạo draft chỉ nhận
 * type, payload và localAttachment; attachmentId chưa tồn tại ở bước này vì
 * file chỉ được upload sau khi draft có id để làm ownerId.
 */
function requestBody(request: NewEmployeeRequest) {
  return {
    type: request.type,
    payload: request.payload,
    localAttachment: request.attachment
      ? {
          name: request.attachment.name,
          mimeType: request.attachment.mimeType,
          size: request.attachment.size,
        }
      : null,
  };
}

/** Body cho PATCH /requests/:id. Gửi kèm attachmentId; null nghĩa là bỏ file. */
function updateBody(request: NewEmployeeRequest) {
  return {
    ...requestBody(request),
    attachmentId: request.attachment?.id ?? null,
  };
}

/**
 * Idempotency-Key phải ổn định cho cùng một thao tác submit của người dùng.
 * Backend scope key theo (employeeId, action, key) và chỉ cache response thành
 * công, nên key dẫn xuất từ requestId vừa chặn double-submit vừa cho phép thử
 * lại sau khi submit thất bại vì lỗi nghiệp vụ.
 */
function idempotencyKey(requestId: string) {
  return `submit:${requestId}`;
}
