import { IProduct, IProductFullFormData } from '../../types/products.types';
import _, { isObject, pick } from 'lodash';

export function toOfferFormData(input: IProduct): IProductFullFormData {
  const createProductFormDataOmitPaths: (keyof IProduct | string)[] = [
    '_id',
    'createdAt',
    'updatedAt',
    'deletedAt',
    'prices',
    'variations',
    'warehouses',
    'inventories',
  ];
  const getFormValuePickPaths = (data?: any) => {
    return data ? ['_id', 'label', 'email', 'dirType', 'parent', 'name', 'secondName'].filter(key => key in data) : [];
  };
  const isArrayForTransformToIdsArray = <T extends keyof IProduct | string = any>(key: T) => {
    return ['properties', 'categories'].includes(key);
  };
  const data = _.cloneDeep(_.omit(input, createProductFormDataOmitPaths));
  let output: Record<keyof IProductFullFormData | string, any> = {};

  Object.entries(data).map(([k, v], _index) => {
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
      const newValue = pick(v, getFormValuePickPaths(v));
      return (output[k as keyof IProductFullFormData] = newValue);
    } else {
      return (output[k as keyof IProductFullFormData] = v);
    }
  });

  // console.log({ dataInArray });

  // console.log('createProductFormData output', output);
  return output;
}
