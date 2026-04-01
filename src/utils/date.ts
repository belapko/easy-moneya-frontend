export type DateValue = Date | string | number;

const DATE_TIME_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export function toDate(value: DateValue): Date | null {
  const date = value instanceof Date
    ? new Date(value.getTime())
    : new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

export function formatDateTimeForInput(value: DateValue): string {
  const date = toDate(value);

  if (date === null) {
    return '';
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return localDate.toISOString().slice(0, 16);
}

export function formatDateTime(value: DateValue, locale?: string | string[]): string {
  const date = toDate(value);

  if (date === null) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, DATE_TIME_FORMAT_OPTIONS).format(date);
}
