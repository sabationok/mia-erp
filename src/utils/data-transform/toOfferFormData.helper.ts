import { IOfferFullFormData, OfferEntity } from '../../types/offers/offers.types';
import _, { isObject, pick } from 'lodash';

export function toOfferFormData(input: OfferEntity): IOfferFullFormData {
  const createProductFormDataOmitPaths: (keyof OfferEntity | string)[] = [
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
  const isArrayForTransformToIdsArray = <T extends keyof OfferEntity | string = any>(key: T) => {
    return ['properties', 'categories'].includes(key);
  };
  const data = _.cloneDeep(_.omit(input, createProductFormDataOmitPaths));
  let output: Record<keyof IOfferFullFormData | string, any> = {};

  Object.entries(data).map(([k, v], _index) => {
    if (v === null) {
      return (output[k as keyof IOfferFullFormData] = v);
    }
    if (!v) {
      return { [k]: v };
    }
    if (['string', 'number'].includes(typeof v)) {
      return (output[k as keyof IOfferFullFormData] = v);
    } else if (typeof v === 'object') {
      if (Array.isArray(v)) {
        if (isArrayForTransformToIdsArray(k)) {
          return (output[k as keyof IOfferFullFormData] = v.map(el => isObject(el) && '_id' in el && el._id)).filter(
            el => el
          );
        }
        return (output[k as keyof IOfferFullFormData] = v);
      }
      const newValue = pick(v, getFormValuePickPaths(v));
      return (output[k as keyof IOfferFullFormData] = newValue);
    } else {
      return (output[k as keyof IOfferFullFormData] = v);
    }
  });

  // console.log({ dataInArray });

  // console.log('createProductFormData output', output);
  return output;
}
