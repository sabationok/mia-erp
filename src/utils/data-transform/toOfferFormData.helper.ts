import { IOfferFullFormData, OfferEntity } from '../../types/offers/offers.types';
import _, { isObject } from 'lodash';

const omitPaths: (keyof OfferEntity | string)[] = [
  '_id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'prices',
  'variations',
  'warehouses',
  'inventories',
];
// const getFormValuePickPaths = (data?: any) => {
//   return data ? ['_id', 'label', 'email', 'dirType', 'parent', 'name', 'secondName'].filter(key => key in data) : [];
// };
const isArrayForTransformToIdsArray = <T extends keyof OfferEntity | string = any>(key: T) => {
  return ['properties', 'categories'].includes(key);
};

export function toOfferFormData(input: OfferEntity): IOfferFullFormData {
  const data = _.cloneDeep(_.omit(input, omitPaths));

  let output: Record<keyof IOfferFullFormData | string, any> = {};

  Object.entries(data).forEach(([k, v], _index) => {
    if (v === undefined) {
      return;
    }

    if (v === null) {
      return (output[k as keyof IOfferFullFormData] = v);
    }
    if (typeof v === 'boolean') {
      return (output[k as keyof IOfferFullFormData] = v);
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
      // const newValue = pick(v, getFormValuePickPaths(v));
      return (output[k as keyof IOfferFullFormData] = v);
    } else {
      return (output[k as keyof IOfferFullFormData] = v);
    }
  });

  // console.log({ dataInArray });

  // console.log('createProductFormData output', output);
  return output;
}
