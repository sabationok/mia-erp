import { parseISO } from 'date-fns';
import { useMemo } from 'react';
import { toAppDateFormat } from '../utils';

const useAppDate = (
  date: string | number | Date
): {
  formattedDate: string;
  formattedTime: string;
} => {
  let formattedDate = '--.--.----',
    formattedTime = '--:--:--';

  try {
    if (date) {
      const parsedDate = typeof date === 'string' ? parseISO(date) : parseISO(new Date(date).toString());

      formattedDate = toAppDateFormat(parsedDate, 'dd.MM.yyyy');
      formattedTime = toAppDateFormat(parsedDate, '(HH:mm:ss)');
    }
  } catch (e) {
    console.error('useAppDate | wrong date format passed', { date });
  }

  return useMemo(() => ({ formattedDate, formattedTime }), [formattedDate, formattedTime]);
};

export default useAppDate;
