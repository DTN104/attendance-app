export type RequestStatus = 'pending' | 'approved' | 'rejected';
export type RequestTypeId = 'leave' | 'remote' | 'late-early' | 'business' | 'adjustment';

export type EmployeeRequest = {
  id: string;
  title: string;
  period: string;
  submittedAt: string;
  status: RequestStatus;
};

export type RequestTypeOption = {
  id: RequestTypeId;
  title: string;
  description: string;
};

export const requestSummary = [
  { label: 'Chờ duyệt', value: '02' },
  { label: 'Đã duyệt', value: '04' },
  { label: 'Từ chối', value: '01' },
] as const;

export const employeeRequests: EmployeeRequest[] = [
  { id: 'REQ-012', title: 'Nghỉ phép năm', period: '15/07/2026 - 16/07/2026', submittedAt: 'Tạo ngày 10/07/2026', status: 'pending' },
  { id: 'REQ-011', title: 'Điều chỉnh chấm công', period: '09/07/2026 · Giờ vào 08:03', submittedAt: 'Tạo ngày 09/07/2026', status: 'approved' },
  { id: 'REQ-010', title: 'Làm việc từ xa', period: '03/07/2026', submittedAt: 'Tạo ngày 01/07/2026', status: 'rejected' },
];

export const requestTypes: RequestTypeOption[] = [
  { id: 'leave', title: 'Đơn nghỉ phép', description: 'Nghỉ phép năm, nghỉ không lương' },
  { id: 'remote', title: 'Làm việc từ xa', description: 'Đăng ký làm việc ngoài văn phòng' },
  { id: 'late-early', title: 'Đi muộn / về sớm', description: 'Xin phép thay đổi giờ làm việc' },
  { id: 'business', title: 'Đơn công tác', description: 'Đăng ký lịch công tác bên ngoài' },
  { id: 'adjustment', title: 'Điều chỉnh chấm công', description: 'Bổ sung hoặc sửa giờ chấm công' },
];

export const leaveTypes = ['Nghỉ phép năm', 'Nghỉ không lương', 'Nghỉ ốm'] as const;

