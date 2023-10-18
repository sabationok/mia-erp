import { ThunkPayload } from './store.store';
import { AxiosResponse } from 'axios';
import { ApiCallerPayload } from '../api/createApiCall.api';
import { ApiDirType } from './APP_CONFIGS';

export interface OnlyUUID {
  _id: string;
}

export type ArrayUUID = Array<string>;
export type ArrayOfObjUUID = Array<OnlyUUID>;

export type IdKeyVersion = '_id' | 'id';
export type ObjUUID<K extends IdKeyVersion = '_id'> = Record<K, string>;

export interface IBase extends OnlyUUID {
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export interface IFormDataValueWithUUID<DirType extends ApiDirType = any> extends OnlyUUID {
  label?: string;
  name?: string;
  secondName?: string;
  dirType?: DirType;
  email?: string;
  parent?: Omit<IFormDataValueWithUUID<DirType>, 'parent'>;
}
export interface IDataWithPeriod {
  timeFrom?: string | number | Date | null;
  timeTo?: string | number | Date | null;
}
export interface IBaseWithPeriod extends IBase, IDataWithPeriod {}

export type IFormDataValue = IFormDataValueWithUUID | string | number | boolean | Date | null;

export interface RoleActionType extends OnlyUUID {
  label?: string;
  value?: string;
  type?: string;
}

export enum ModuleNames {
  COMPANIES = 'COMPANIES',
  TRANSACTIONS = 'TRANSACTIONS',
  ORDERS = 'ORDERS',
  REFUNDS = 'REFUNDS',
  SUPPLEMENT = 'SUPPLEMENT',
  STORAGE = 'STORAGE',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  PRODUCTS = 'PRODUCTS',
  DIR_CATEGORIES_TR = 'DIR_CATEGORIES_TR',
  DIR_CATEGORIES_PROD = 'DIR_CATEGORIES_PROD',
  DIR_COUNTS = 'DIR_COUNTS',
  DIR_CONTRACTORS = 'DIR_CONTRACTORS',
  DIR_ACTIVITIES = 'DIR_ACTIVITIES',
}

export enum CompanyQueryTypeEnum {
  own = 'own',
  all = 'all',
  invites = 'invites',
  invited = 'invited',
}
export interface IContactsSlot extends ContactsDto, IBase {}
export interface ContactsDto {
  email?: string;
  phone?: string;
}
export interface IAddressSlot extends AddressDto, IBase {}
export interface AddressDto {
  country?: string;
  region?: string;
  city?: string;
  street?: string;
  house?: number;
  office?: string;
}

export interface AppResponse<D = any, M = any>
  extends AxiosResponse<{
    statusCode?: number;
    message?: string;
    innerCode?: number;
    description?: string;
    meta: M;
    data: D;
  }> {}

export type CompanyQueryType = 'own' | 'all' | 'invites' | 'invited';

export type ServiceDispatcher<P = any> = (args: P) =>
  | {
      payload: unknown | P;
      type: string;
    }
  | undefined;

export type ServiceDispatcherAsync<SD = any, RD = any, E = any> = (args?: ThunkPayload<SD, RD, E>) => Promise<
  | {
      payload: unknown | RD;
      type: string;
    }
  | undefined
>;

export type ServiceApiCaller<SD = any, RD = any, E = any | unknown, MD = any> = (
  payload: ApiCallerPayload<SD, RD, E>
) => Promise<AppResponse<RD, MD> | undefined>;
