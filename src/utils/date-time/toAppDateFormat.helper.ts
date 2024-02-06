import { format } from 'date-fns';

export type AppDateFormats = `yyyy-MM-dd'T'HH:mm` | `yyyy-MM-dd' / 'HH:mm` | 'dd.MM.yyyy' | '(HH:mm:ss)' | string;

export function toAppDateFormat(date: number | Date, formatString: AppDateFormats = `yyyy-MM-dd / HH:mm`) {
  // Форматуємо дату та час у відповідний формат
  return format(date, formatString);
}
