import { ITransaction, ITransactionForReq } from '../../types/finances/transactions.types';

export function toTrReqData(
  transaction: ITransaction,
  omitPathArr: (keyof ITransaction)[] = [],
  dateToNumberPath?: keyof Pick<ITransaction, 'eventDate'> | string,
  amountToNumberPath?: keyof Pick<ITransaction, 'amount'> | string
): Omit<ITransactionForReq, keyof ITransaction> {
  let transformedData: ITransactionForReq = {};

  const keys = Object.keys(transaction) as (keyof ITransaction)[];
  keys.map(key => {
    if (['_id', 'createdAt', 'updatedAt', ...omitPathArr]?.includes(key)) return '';

    const value = transaction[key];

    if (dateToNumberPath && key === dateToNumberPath && typeof value === 'string') {
      transformedData[key] = new Date(value).valueOf();
      return '';
    }
    if (amountToNumberPath && key === amountToNumberPath && typeof value === 'string') {
      console.log(amountToNumberPath, transformedData[key], Number(value));
      transformedData[key] = Number(value) || 0;
      return '';
    }
    if (value && typeof value === 'object') {
      if ('_id' in value) {
        transformedData[key] = { _id: value?._id };
        return '';
      }
      return '';
    }
    transformedData[key] = value;
    return '';
  });

  return transformedData;
}
