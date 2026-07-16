export type AttendanceStatus = 'on-time' | 'late' | 'leave' | 'missing';

export type AttendanceRecord = {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string;
  worked: string;
  status: AttendanceStatus;
};

export const attendanceHistory: AttendanceRecord[] = [
  { id: '13', date: '2026-07-13', checkIn: '08:27', checkOut: '--:--', worked: 'Đang làm', status: 'on-time' },
  { id: '10', date: '2026-07-10', checkIn: '08:41', checkOut: '17:36', worked: 'Đi muộn', status: 'late' },
  { id: '9', date: '2026-07-09', checkIn: '08:24', checkOut: '17:42', worked: 'Đủ công', status: 'on-time' },
  { id: '8', date: '2026-07-08', checkIn: '08:35', checkOut: '17:55', worked: 'Đủ công', status: 'on-time' },
  { id: '7', date: '2026-07-07', checkIn: '07:58', checkOut: '17:35', worked: '8 giờ 37 phút', status: 'on-time' },
  { id: '6', date: '2026-07-06', checkIn: '08:04', checkOut: '17:31', worked: '8 giờ 27 phút', status: 'on-time' },
  { id: '3', date: '2026-07-03', checkIn: '08:11', checkOut: '17:29', worked: '8 giờ 18 phút', status: 'late' },
  { id: '2', date: '2026-07-02', checkIn: '08:03', checkOut: '17:38', worked: '8 giờ 35 phút', status: 'on-time' },
  { id: '1', date: '2026-07-01', checkIn: '08:06', checkOut: '17:34', worked: '8 giờ 28 phút', status: 'on-time' },
];
