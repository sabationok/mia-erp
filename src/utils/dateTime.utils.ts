import { format, set } from 'date-fns';

export const formatDateForInputValue = (date?: number | string | Date, formatString?: string): string => {
  // Отримуємо поточну дату та час
  const currentDate = date ? new Date(date) : new Date();

  // Встановлюємо значення годин і хвилин на поточні
  const currentTime = set(currentDate, { hours: currentDate.getHours(), minutes: currentDate.getMinutes() });

  // Форматуємо дату та час у відповідний формат
  return format(currentTime, formatString || "yyyy-MM-dd'T'HH:mm");
};
export function formatDate(date: number | Date, formatString?: string) {
  // Форматуємо дату та час у відповідний формат
  return format(date, formatString || "yyyy-MM-dd' / 'HH:mm");
}
