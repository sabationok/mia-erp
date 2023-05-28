import { ITransaction, ITransactionForReq } from '../redux/transactions/transactions.types';

function getValueByPath({ data, path }: { data?: object; path?: string }): any {
  if (!data || !path) {
    return null;
  }
  const keys = path.split('.');
  const [key, ...rest] = keys;

  if (rest.length === 0) {
    return data[key as keyof typeof data];
  }

  return getValueByPath({
    data: data[key as keyof typeof data],
    path: rest.join('.'),
  });
}

function formatPhoneNumber(phoneNumberString: string): string | null {
  // Видалити всі символи крім цифр
  const cleaned = phoneNumberString.replace(/\D/g, '');

  // Розділити номер на три групи (код країни, код міста/оператора, номер)
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    // Форматувати номер в потрібний формат
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }

  // Якщо номер телефону не відповідає очікуваному формату
  return null;
}

function createTransactionForReq(
  transaction: ITransaction,
  omitPathArr?: (keyof ITransaction)[],
  dateToNumberPath?: keyof ITransaction | null
): ITransactionForReq {
  let transformedData: ITransactionForReq = {};

  const keys = Object.keys(transaction) as (keyof ITransaction)[];
  keys.map(key => {
    if (omitPathArr?.includes(key)) return '';

    const value = transaction[key];
    if (dateToNumberPath && key === dateToNumberPath && typeof value === 'string') {
      transformedData[key] = new Date(value).valueOf();
      return '';
    }
    if (value && typeof value === 'object' && '_id' in value) {
      transformedData[key] = value?._id;
      return '';
    }
    transformedData[key] = value;
    return '';
  });

  // if (omitPathArr && omitPathArr?.length > 0) return _.omit(transformedData, ...omitPathArr);

  return transformedData;
}

export { getValueByPath, formatPhoneNumber, createTransactionForReq };
