import { ITransaction, ITransactionForReq } from '../redux/transactions/transactions.types';
import { cloneDeep, isObject, omit, pick } from 'lodash';
import { OnlyUUID } from '../redux/global.types';
import { IVariation, IVariationFormData, IVariationReqData } from '../redux/products/variations.types';
import { ConfigService } from '../services';
import {
  IProduct,
  IProductDefaults,
  IProductDefaultsFormData,
  IProductFullFormData,
} from '../redux/products/products.types';

const isDevMode = ConfigService.isDevMode();
export function parseBool(key?: 'false' | 'true' | string) {
  return key === 'true';
}
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
  options?: {
    omitPathArr?: (keyof IncomeDataType)[];
    dateToNumberPath?: keyof IncomeDataType | string;
    amountToNumberPath?: keyof IncomeDataType | string;
    checkArrayPath?: keyof IncomeDataType | string;
    ignorePaths?: (keyof IncomeDataType)[];
  }
): Partial<Omit<OutDataType, keyof IncomeDataType>> {
  let outData: Partial<OutDataType> = {};

  const keys = Object.keys(incomeData) as (keyof IncomeDataType)[];

  keys.map(key => {
    if (['_id', 'createdAt', 'updatedAt', ...(options?.omitPathArr || [])]?.includes(key)) return '';
    const value = incomeData[key];

    if (options?.ignorePaths && options.ignorePaths.includes(key)) {
      outData[key] = value;
      return '';
    }
    if (!value) return '';

    if (options?.dateToNumberPath && key === options?.dateToNumberPath) {
      outData[key] = new Date(value).valueOf() as any;
      return '';
    }
    if (options?.amountToNumberPath && key === options?.amountToNumberPath) {
      outData[key] = (Number(value) || 0) as any;
      return '';
    }
    if (value && typeof value === 'object') {
      if ('_id' in value) return (outData[key] = { _id: value?._id } as any);
      if ('value' in value) return (outData[key] = value?.value);
      if (Array.isArray(value) && value.length > 0) {
        console.log('createDataForReq isArray', { key, value });
        outData[key] = value as any;
        return '';
      }
      return '';
    }

    outData[key] = value as any;
    return value;
  });

  console.log('outData', outData);
  return outData;
}

export const createVariationReqData = (formData: IVariationFormData, _id?: string): IVariationReqData => {
  isDevMode && console.log('createVariationReqData input', formData);

  const data: IVariationReqData['data'] = {
    timeFrom: formData?.timeFrom,
    timeTo: formData?.timeTo,
    product: formData?.product ? ExtractId(formData?.product) : undefined,
    label: formData?.label,
    properties: formData?.propertiesMap ? Object.values(formData?.propertiesMap) : undefined,
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
    label: variation.label ? variation.label : variation?.product?.label,
    product: variation?.product ? ExtractId(variation.product) : undefined,
    propertiesMap,
  };
};

const createProductFormDataOmitPaths: (keyof IProduct | string)[] = [
  'variations',
  'inventories',
  'prices',
  '_id',
  'createdAt',
  'updatedAt',
  'deletedAt',
];
const getFormValuePickPaths = (data?: any) => {
  return data ? ['_id', 'label', 'email', 'dirType', 'parent', 'name', 'secondName'].filter(key => key in data) : [];
};
const isArrayForTransformToIdsArray = <T extends keyof IProduct | string = any>(key: T) => {
  return ['properties', 'categories'].includes(key);
};
export function createProductFormData(
  input: IProduct,
  omitPaths: (keyof IProduct | string)[] = createProductFormDataOmitPaths
): IProductFullFormData {
  const data = cloneDeep(omitPaths ? omit(input, omitPaths) : input);
  let output: Record<keyof IProduct | string, any> = {};

  Object.entries(data).map(([k, v], index) => {
    if (v === null) {
      return (output[k as keyof IProductFullFormData] = v);
    }
    if (!v) {
      return { [k]: v };
    }
    if (['string', 'number'].includes(typeof v)) {
      return (output[k as keyof IProductFullFormData] = v);
    } else if (typeof v === 'object') {
      if (Array.isArray(v)) {
        if (isArrayForTransformToIdsArray(k)) {
          return (output[k as keyof IProductFullFormData] = v.map(el => isObject(el) && '_id' in el && el._id)).filter(
            el => el
          );
        }
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
      return (output[k as keyof IProductFullFormData] = newValue);
    } else {
      return (output[k as keyof IProductFullFormData] = v);
    }
  });

  // console.log({ dataInArray });

  console.log('createProductFormData output', output);
  return omit(output, omitPaths ? omitPaths : ['_id', 'createdAt', 'updatedAt']);
}
