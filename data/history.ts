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

const calendarStatus: Partial<Record<number, AttendanceStatus>> = {
  1: 'on-time',
  2: 'on-time',
  3: 'late',
  6: 'on-time',
  7: 'on-time',
  8: 'on-time',
  9: 'late',
  10: 'on-time',
  13: 'on-time',
};

export const calendarDays = Array.from({ length: 31 }, (_, index) => ({
  date: index + 1,
  status: calendarStatus[index + 1],
}));

export const attendanceHistory: AttendanceRecord[] = [
  { id: '13', date: '13/07', day: 'Thứ Hai', checkIn: '08:02', checkOut: '--:--', worked: 'Đang làm', status: 'on-time' },
  { id: '10', date: '10/07', day: 'Thứ Sáu', checkIn: '08:01', checkOut: '17:32', worked: '8 giờ 31 phút', status: 'on-time' },
  { id: '9', date: '09/07', day: 'Thứ Năm', checkIn: '08:16', checkOut: '17:28', worked: '8 giờ 12 phút', status: 'late' },
  { id: '8', date: '08/07', day: 'Thứ Tư', checkIn: '08:05', checkOut: '17:42', worked: '8 giờ 37 phút', status: 'on-time' },
  { id: '7', date: '07/07', day: 'Thứ Ba', checkIn: '07:58', checkOut: '17:35', worked: '8 giờ 37 phút', status: 'on-time' },
  { id: '6', date: '06/07', day: 'Thứ Hai', checkIn: '08:04', checkOut: '17:31', worked: '8 giờ 27 phút', status: 'on-time' },
  { id: '3', date: '03/07', day: 'Thứ Sáu', checkIn: '08:11', checkOut: '17:29', worked: '8 giờ 18 phút', status: 'late' },
  { id: '2', date: '02/07', day: 'Thứ Năm', checkIn: '08:03', checkOut: '17:38', worked: '8 giờ 35 phút', status: 'on-time' },
  { id: '1', date: '01/07', day: 'Thứ Tư', checkIn: '08:06', checkOut: '17:34', worked: '8 giờ 28 phút', status: 'on-time' },
];
