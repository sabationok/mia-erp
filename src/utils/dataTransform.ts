import { ITransaction, ITransactionForReq } from '../redux/transactions/transactions.types';
import { cloneDeep, omit, pick } from 'lodash';
import { OnlyUUID } from '../redux/global.types';
import { IVariationFormData } from '../components/Forms/FormVariation';
import { IVariation, IVariationReqData } from '../redux/products/variations.types';
import { ConfigService } from '../services';
import {
  IProduct,
  IProductDefaults,
  IProductDefaultsFormData,
  IProductFullFormData,
} from '../redux/products/products.types';

const isDevMode = ConfigService.isDevMode();

export const ExtractId = <T extends OnlyUUID>(data: T) => (pick(data, '_id')._id ? pick(data, '_id') : { _id: '' });
export const ExtractIdString = <T extends OnlyUUID>(data: Partial<T>) =>
  '_id' in data ? pick(data, '_id')._id : undefined;

export function getValueByPath({ data, path }: { data?: object; path?: string }): any {
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

export function formatPhoneNumber(phoneNumberString: string): string | null {
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

export function createTransactionForReq(
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

export function createDataForReq<
  IncomeDataType extends Record<string, any> = any,
  OutDataType extends Record<keyof IncomeDataType, any> = any
>(
  incomeData: IncomeDataType,
  omitPathArr: (keyof IncomeDataType)[] = [],
  options?: {
    dateToNumberPath?: keyof IncomeDataType | string;
    amountToNumberPath?: keyof IncomeDataType | string;
  }
): Partial<Omit<OutDataType, keyof IncomeDataType>> {
  let outData: Partial<OutDataType> = {};

  const keys = Object.keys(incomeData) as (keyof IncomeDataType)[];

  keys.map(key => {
    if (['_id', 'createdAt', 'updatedAt', ...omitPathArr]?.includes(key)) return '';

    const value = incomeData[key];
    if (!value) return '';

    if (options?.dateToNumberPath && key === options?.dateToNumberPath && typeof value === 'string') {
      outData[key] = new Date(value).valueOf() as any;
      return '';
    }
    if (options?.amountToNumberPath && key === options?.amountToNumberPath && typeof value === 'string') {
      outData[key] = (Number(value) || 0) as any;
      return '';
    }
    if (value && typeof value === 'object') {
      if ('_id' in value) outData[key] = { _id: value?._id } as any;
      if ('value' in value) outData[key] = value?.value;
      return '';
    }

    outData[key] = value as any;
    return '';
  });
  return outData;
}

export const createVariationReqData = (formData: IVariationFormData, _id?: string): IVariationReqData => {
  isDevMode && console.log('createVariationReqData input', formData);

  const data = {
    timeFrom: formData?.timeFrom,
    timeTo: formData?.timeTo,
    product: formData?.product ? ExtractId(formData?.product) : undefined,
    price: formData?.price,
    properties: formData?.propertiesMap ? Object.values(formData?.propertiesMap) : [],
  };
  isDevMode && console.log('createVariationReqData output', data);

  const dataForReq = createDataForReq(data);

  isDevMode && console.log('createVariationReqData createDataForReq output', dataForReq);

  return _id ? { data, _id } : { data };
};
export const createVariationFormData = (variation: IVariation): IVariationFormData => {
  let propertiesMap: Record<string, string> = {};
  variation?.properties?.map(prop => {
    if (prop?._id && prop?.parent?._id) {
      propertiesMap = { ...propertiesMap, [prop.parent?._id]: prop._id };
    }
    return null;
  });

  return {
    timeFrom: variation?.timeFrom,
    timeTo: variation?.timeTo,
    product: variation?.product ? ExtractId(variation?.product) : undefined,
    price: variation?.price,
    propertiesMap,
  };
};

export function createProductFormData(input: IProduct, omitPaths?: [string | keyof IProduct]): IProductFullFormData {
  const data = cloneDeep(input);
  let output: Record<keyof IProduct | string, any> = {};
  // console.log('createProductFromData input', data);

  const getFormValuePickPaths = (data?: any) => {
    return data ? ['_id', 'label', 'email', 'dirType', 'parent', 'name', 'secondName'].filter(key => key in data) : [];
  };

  Object.entries(data).map(([k, v], index) => {
    if (v === null) {
      // output[k as keyof IProductFullFormData] = v;
      return (output[k as keyof IProductFullFormData] = v);
    }
    if (!v) {
      return { [k]: v };
    }
    if (['string', 'number'].includes(typeof v)) {
      // output[k as keyof IProductFullFormData] = v;
      return (output[k as keyof IProductFullFormData] = v);
    } else if (typeof v === 'object') {
      if (Array.isArray(v)) {
        // output[k as keyof IProductFullFormData] = v;
        return (output[k as keyof IProductFullFormData] = v);
      }
      if (k === 'defaults') {
        const newDefaults: Record<keyof IProductDefaults | string, any> = {};

        Object.entries(v as IProductDefaults).map(([dk, dv]) => {
          const newDefValue = pick(dv, getFormValuePickPaths(v));
          // newDefaults[dk as keyof IProductDefaultsFormData] = newDefValue;
          return (newDefaults[dk as keyof IProductDefaultsFormData] = newDefValue);
        });

        return newDefaults;
      }

      const newValue = pick(v, getFormValuePickPaths(v));
      k === 'category' && console.log({ newValue, value: v });
      // console.log('newValue', newValue);
      // output[k as keyof IProductFullFormData] = newValue;
      return (output[k as keyof IProductFullFormData] = newValue);
    } else {
      // output[k as keyof IProductFullFormData] = v;
      return (output[k as keyof IProductFullFormData] = v);
    }
  });

  // console.log({ dataInArray });

  // console.log('createProductFromData output', output);
  return omit(output, omitPaths ? omitPaths : ['_id', 'createdAt', 'updatedAt']);
}
