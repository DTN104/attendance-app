const DAY_MS = 86_400_000;

export function formatDate(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function formatShortDate(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`;
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
