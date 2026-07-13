export type AttendanceStatus = 'on-time' | 'late' | 'leave' | 'missing';

export type AttendanceRecord = {
  id: string;
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  worked: string;
  status: AttendanceStatus;
};

export const historySummary = [
  { label: 'Ngày công', value: '12' },
  { label: 'Đi muộn', value: '01' },
  { label: 'Nghỉ phép', value: '02' },
] as const;

export const attendanceHistory: AttendanceRecord[] = [
  { id: '1', date: '13/07', day: 'Thứ Hai', checkIn: '08:02', checkOut: '--:--', worked: 'Đang làm', status: 'on-time' },
  { id: '2', date: '10/07', day: 'Thứ Sáu', checkIn: '08:01', checkOut: '17:32', worked: '8 giờ 31 phút', status: 'on-time' },
  { id: '3', date: '09/07', day: 'Thứ Năm', checkIn: '08:16', checkOut: '17:28', worked: '8 giờ 12 phút', status: 'late' },
  { id: '4', date: '08/07', day: 'Thứ Tư', checkIn: '--:--', checkOut: '--:--', worked: 'Nghỉ phép', status: 'leave' },
  { id: '5', date: '07/07', day: 'Thứ Ba', checkIn: '07:58', checkOut: '17:35', worked: '8 giờ 37 phút', status: 'on-time' },
];

