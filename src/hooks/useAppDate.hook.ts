import { useMemo } from 'react';
import { format, parseISO } from 'date-fns';

const useAppDate = (
  date: string | number | Date
): {
  formattedDate: string;
  formattedTime: string;
} =>
  useMemo(() => {
    let formattedDate = '-',
      formattedTime = '-';
    if (date) {
      const parsedDate = typeof date === 'string' ? parseISO(date) : parseISO(new Date(date).toString());

      formattedDate = format(parsedDate, 'dd.MM.yyyy');
      formattedTime = format(parsedDate, '(HH:mm:ss)');
    }
    return { formattedDate, formattedTime };
  }, [date]);

export default useAppDate;
