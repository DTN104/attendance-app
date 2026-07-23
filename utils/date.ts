const DAY_MS = 86_400_000;
const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('vi-VN', { weekday: 'long' });

export function formatDate(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function formatShortDate(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
}

export function formatIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatMonthLabel(date: Date) {
  return `Tháng ${pad(date.getMonth() + 1)} / ${date.getFullYear()}`;
}

export function formatMonthKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

export function formatWeekday(date: Date) {
  return WEEKDAY_FORMATTER.format(date);
}

export function getCalendarMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  return {
    days: Array.from({ length: new Date(year, month + 1, 0).getDate() }, (_, index) => index + 1),
    leadingDays: (new Date(year, month, 1).getDay() + 6) % 7,
  };
}

export function parseIsoDate(value: string) {
  return new Date(`${value}T00:00:00`);
}

export function shiftMonth(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1);
}

export function formatTime(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function getInclusiveDayCount(fromDate: Date, toDate: Date) {
  const start = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const end = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
  return Math.floor((end - start) / DAY_MS) + 1;
}

export function getHourDuration(fromTime: Date, toTime: Date) {
  return Math.max(0, (toTime.getTime() - fromTime.getTime()) / 3_600_000);
}

export function formatHours(hours: number) {
  return Number.isInteger(hours) ? String(hours) : hours.toFixed(1);
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}
