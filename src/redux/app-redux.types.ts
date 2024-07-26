import { ThunkArgs } from './store.store';
import { ApiCallerPayload, ApiResponse } from '../api';
import { ApiDirType } from './APP_CONFIGS';
import { AppDate, MaybeNull, OnlyUUID } from '../types/utils.types';

export * from '../types/global.types';

export type { ApiResponse } from '../api/api.types';

export type UUID = string;
export type MagicLink = string;

export interface MagicLinkRef {
  magicLink: MagicLink;
}

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

export type AppResponseType<D = any, M = any> = {
  statusCode?: number;
  message?: string;
  innerCode?: number;
  description?: string;
  meta: M;
  data: D;
};

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
) => Promise<ApiResponse<RD, MD> | undefined>;

export type _ServiceApiCaller<Type extends (...args: any[]) => any> = (
  ...args: Parameters<Type>
) => ReturnType<Type> | Promise<any>;

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
