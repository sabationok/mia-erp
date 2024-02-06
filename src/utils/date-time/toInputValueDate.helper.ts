import { format, set } from 'date-fns';

export const toInputValueDate = (date?: number | string | Date): string => {
  // Отримуємо поточну дату та час
  const currentDate = date ? new Date(date) : new Date();

  // Встановлюємо значення годин і хвилин на поточні
  const currentTime = set(currentDate, { hours: currentDate.getHours(), minutes: currentDate.getMinutes() });

  // Форматуємо дату та час у відповідний формат
  return format(currentTime, "yyyy-MM-dd'T'HH:mm");
};
