import { useParams } from 'react-router-dom';
import { Keys, PartialRecord, UUID } from '../types/utils.types';

export enum AppUrlParamKeys {
  companyId = 'companyId',
  permissionId = 'permissionId',
  warehouseId = 'warehouseId',
  priceListId = 'priceListId',
  priceId = 'priceId',
  discountId = 'discountId',
  offerId = 'offerId',
  orderId = 'orderId',
  cartId = 'cartId',
  refundId = 'refundId',
  customerId = 'customerId',
}

export type AppUrlIdParams = PartialRecord<Extract<Keys<typeof AppUrlParamKeys>, `${string}Id`>, UUID>;

export type AppUrlParams = PartialRecord<Keys<typeof AppUrlParamKeys>, string>;
const useAppParams = (): Readonly<Partial<AppUrlParams & { '*': string }>> => useParams<AppUrlParams>();

export default useAppParams;

// type FieldValues = { [k: string]: any };
//
// export type RefToIdField<FValues extends FieldValues> = FValues extends {
//   [key in keyof FValues]: OnlyUUID;
// }
//   ? { [key in `${Exclude<keyof FValues, symbol>}Id`]: string }
//   : FValues;
//
// const transform = <FValues extends FieldValues>(fields: FValues): RefToIdField<FValues> => {
//   const entries = ObjectEntries(fields).map(([key, value]) => {
//     if (typeof value === 'object') {
//       if ('_id' in value) {
//         return [`${String(key)}Id`, value._id] as [`${Exclude<typeof key, symbol>}Id`, string];
//       }
//       if (Object.values(value).some(v => typeof value === 'object')) {
//         return [key, transform(value)];
//       }
//     }
//     return [key, value] as [typeof key, typeof value];
//   });
//
//   return Object.fromEntries(entries);
// };

// export type RefToIdField<FValues extends FieldValues> = {
//   [K in keyof FValues as FValues[K] extends OnlyUUID ? `${string & K}Id` : K]: FValues[K] extends OnlyUUID
//     ? string
//     : FValues[K] extends object
//       ? RefToIdField<FValues[K]>
//       : FValues[K];
// };
