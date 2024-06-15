import { ThunkArgs } from './store.store';
import { AxiosResponse } from 'axios';
import { ApiCallerPayload } from '../api';
import { ApiDirType } from './APP_CONFIGS';
import { AppDate, MaybeNull } from '../types/utils.types';

export type UUID = string;
export type MagicLink = string;
export interface OnlyUUID {
  _id: UUID;
}
export interface MagicLinkRef {
  magicLink: MagicLink;
}

export type ArrayOfUUID = Array<string>;
export type ArrayOfObjUUID = Array<OnlyUUID>;

export type IdKeyVersion = '_id' | 'id';
export type ObjUUID<K extends IdKeyVersion = '_id'> = Record<K, string>;

export interface IBase extends OnlyUUID {
  createdAt?: MaybeNull<Date | string>;
  updatedAt?: MaybeNull<Date | string>;
  deletedAt?: MaybeNull<Date | string>;
}

export type IBaseKeys = keyof IBase;
export interface IFormDataValueWithID<DirType extends ApiDirType = any> extends OnlyUUID {
  label?: MaybeNull<string>;
  name?: string;
  secondName?: string;
  dirType?: DirType;
  email?: string;
  parent?: Omit<IFormDataValueWithID<DirType>, 'parent'>;
}

export type IFormDataValue = IFormDataValueWithID | string | number | boolean | AppDate | null;

export interface RoleActionType extends OnlyUUID {
  label?: string;
  value?: string;
  type?: string;
}

// export enum ModuleNames {
//   COMPANIES = 'COMPANIES',
//   TRANSACTIONS = 'TRANSACTIONS',
//   ORDERS = 'ORDERS',
//   REFUNDS = 'REFUNDS',
//   SUPPLEMENT = 'SUPPLEMENT',
//   STORAGE = 'STORAGE',
//   MANAGER = 'MANAGER',
//   ADMIN = 'ADMIN',
//   PRODUCTS = 'PRODUCTS',
//   DIR_CATEGORIES_TR = 'DIR_CATEGORIES_TR',
//   DIR_CATEGORIES_PROD = 'DIR_CATEGORIES_PROD',
//   DIR_COUNTS = 'DIR_COUNTS',
//   DIR_CONTRACTORS = 'DIR_CONTRACTORS',
//   DIR_ACTIVITIES = 'DIR_ACTIVITIES',
// }

export interface IContactsSlot extends ContactsDto, IBase {}
export interface ContactsDto {
  email?: string;
  phone?: string;
}
export interface IAddressSlot extends AddressDto, IBase {}
export interface AddressDto {
  country?: string;
  region?: string;
  district?: boolean;
  area?: string;
  city?: string;
  street?: string;
  house?: number;
  office?: string;
  room?: string;
}

export type AppResponseType<D = any, M = any> = {
  statusCode?: number;
  message?: string;
  innerCode?: number;
  description?: string;
  meta: M;
  data: D;
};
export interface AppResponse<D = any, M = any> extends AxiosResponse<AppResponseType<D, M>> {}

export type ServiceDispatcher<P = any> = (args: P) =>
  | {
      payload: unknown | P;
      type: string;
    }
  | undefined;

export type ServiceDispatcherAsync<SD = any, RD = any, E = any> = (args?: ThunkArgs<SD, RD, E>) => Promise<
  | {
      payload: unknown | RD;
      type: string;
    }
  | undefined
>;

export type ServiceApiCaller<SD = any, RD = any, E = any | unknown, MD = any> = (
  payload: ApiCallerPayload<SD, RD, E>
) => Promise<AppResponse<RD, MD> | undefined>;

// AsyncThunk<ActionPayload, ThunkPayload, any>
export type __ServiceDispatcherAsync<Thunk extends (...args: any[]) => any> = (...args: Parameters<Thunk>) => Promise<
  | {
      payload: unknown | Parameters<Thunk>[0];
      type: string;
    }
  | undefined
  | ReturnType<Thunk>
>;
export type __ServiceDispatcher<Thunk extends (...args: any[]) => any> = (...args: Parameters<Thunk>) =>
  | {
      payload: unknown | Parameters<Thunk>[0];
      type: string;
    }
  | undefined
  | ReturnType<Thunk>;
