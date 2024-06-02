import { pick } from 'lodash';
import { ArrayOfObjUUID, ArrayOfUUID, IdKeyVersion, ObjUUID, OnlyUUID } from '../../redux/app-redux.types';
import { IOfferFullFormData, OfferDto, OfferEntity } from '../../types/offers/offers.types';

export * from './toReqData.helper';
export * from './toQueriesForReq.helper';
export * from './parsers.helpers';
export * from './getValueByPath.helper';
export * from './toTrReqData.helper';
export * from './toVariationFormData.helper';
export * from './toVariationReqData.helper';
export * from './toOfferFormData.helper';
export * from './toOrderSlotForReq.helper';
export * from './toOrderInfoReqData.helper';
export * from './getCustomerFullNameOrLabel.helper';

// const isDevMode = ConfigService.isDevMode();

export const getIdRef = <T extends OnlyUUID>(data: T, key: '_id' = '_id'): OnlyUUID =>
  key in data ? pick(data, key) : { [key]: '' };
export const getIdFromRef = <T extends OnlyUUID>(data: T): string => ('_id' in data ? data?._id : '');

// * REFACTORING NEEDED
export const ExtractObjId = <T extends ObjUUID, K extends IdKeyVersion = '_id'>(data: T, key: K) => {
  return (key in data ? pick(data, key) : { [key]: '' }) as ObjUUID<K>;
};

export const ExtractIdString = <T extends OnlyUUID>(data: Partial<T>, key: IdKeyVersion = '_id') =>
  '_id' in data ? pick(data, '_id')._id : undefined;

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

// const createProductFormDataOmitPaths: (keyof IProduct | string)[] = [
//   '_id',
//   'createdAt',
//   'updatedAt',
//   'deletedAt',
//   'prices',
//   'variations',
//   'warehouses',
//   'inventories',
// ];
export const createArrayOfObjUUID = (arr: string[]): ArrayOfObjUUID => {
  return arr.map(_id => ({ _id }));
};
export const createArrayStringUUID = (arr: OnlyUUID[]): ArrayOfUUID => {
  return arr.map(obj => obj._id);
};
export const getFormValuePickPaths = (data?: any) => {
  return data ? ['_id', 'label', 'email', 'dirType', 'parent', 'name', 'secondName'].filter(key => key in data) : [];
};
export const idsArrToObjIdArrPaths = <T extends keyof OfferEntity | string = any>(key: T) => {
  return ['properties', 'categories', 'recommends'].includes(key);
};
export function createProductDto(input: IOfferFullFormData): OfferDto {
  // const arrPaths = ['properties', 'categories', 'recommends'];
  return input;
}
