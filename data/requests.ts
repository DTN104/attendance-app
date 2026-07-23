export type RequestStatus = 'draft' | 'pending' | 'approved' | 'rejected';
export type RequestTypeId = 'leave' | 'overtime' | 'business' | 'adjustment';

export type EmployeeRequest = {
  attachment?: { name: string; objectKey?: string };
  id: string;
  type: RequestTypeId;
  title: string;
  period: string;
  submittedAt: string;
  status: RequestStatus;
  details: RequestDetail[];
};

export type RequestDetail = { label: string; value: string };
export type NewEmployeeRequest = Pick<EmployeeRequest, 'attachment' | 'type' | 'title' | 'period' | 'details'>;

export type RequestTypeOption = {
  id: RequestTypeId;
  title: string;
  description: string;
};

export const employeeRequests: EmployeeRequest[] = [
  {
    id: 'REQ-012', type: 'leave', title: 'Nghỉ phép năm', period: '15/07/2026 - 16/07/2026', submittedAt: 'Tạo ngày 10/07/2026', status: 'pending',
    details: [
      { label: 'Loại nghỉ', value: 'Nghỉ phép năm' },
      { label: 'Thời gian', value: '15/07/2026 - 16/07/2026' },
      { label: 'Thời lượng', value: '2 ngày' },
      { label: 'Lý do', value: 'Giải quyết công việc gia đình' },
    ],
  },
  {
    id: 'REQ-011', type: 'adjustment', title: 'Điều chỉnh chấm công', period: '09/07/2026 · Check-in 08:03', submittedAt: 'Tạo ngày 09/07/2026', status: 'approved',
    details: [
      { label: 'Loại điều chỉnh', value: 'Bổ sung check-in' },
      { label: 'Ngày điều chỉnh', value: '09/07/2026' },
      { label: 'Giờ đề nghị', value: '08:03' },
      { label: 'Lý do', value: 'Quên chấm công khi đến văn phòng' },
    ],
  },
  {
    id: 'REQ-010', type: 'overtime', title: 'Tăng ca ngày thường', period: '08/07/2026 · 18:00 - 20:00', submittedAt: 'Tạo ngày 08/07/2026', status: 'rejected',
    details: [
      { label: 'Loại tăng ca', value: 'Tăng ca ngày thường' },
      { label: 'Ngày tăng ca', value: '08/07/2026' },
      { label: 'Khung giờ', value: '18:00 - 20:00' },
      { label: 'Nội dung', value: 'Hoàn thiện báo cáo cuối tháng' },
    ],
  },
];

export const requestTypes: RequestTypeOption[] = [
  { id: 'leave', title: 'Xin nghỉ phép', description: 'Dùng phép năm hoặc các loại nghỉ khác' },
  { id: 'overtime', title: 'Đăng ký tăng ca', description: 'Gửi yêu cầu làm ngoài giờ' },
  { id: 'business', title: 'Đi công tác', description: 'Tạo lịch và địa điểm công tác' },
  { id: 'adjustment', title: 'Yêu cầu chỉnh công', description: 'Bổ sung hoặc điều chỉnh check-in/out' },
];

export const leaveTypes = ['Nghỉ phép năm', 'Nghỉ không lương', 'Nghỉ ốm'] as const;
