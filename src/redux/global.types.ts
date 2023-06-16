import { ThunkPayload } from './store.store';
import { AxiosResponse } from 'axios';

export interface IBase {
  _id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export enum CompanyQueryTypeEnum {
  own = 'own',
  all = 'all',
  invites = 'invites',
  invited = 'invited',
}

export interface ContactsDto {
  email?: string;
  phone?: string;
}

export interface LocationDto {
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

export type ServiceDispatcher<SD = any, RD = any, E = any> = (payload: ThunkPayload<SD, RD, E>) => void | any;

export type ServiceDispatcherAsync<SD = any, RD = any, E = any> = (payload: ThunkPayload<SD, RD, E>) => Promise<
  | {
      payload: unknown | RD;
      type: string;
    }
  | undefined
>;
export type GetResponseCallback<SD = any, RD = any, MD = any> = (args?: SD) => Promise<AppResponse<RD, MD>>;

export interface ApiCallerPayload<SD = any, RD = any, E = any | unknown> extends ThunkPayload<SD, RD, E> {}

export type ServiceApiCaller<SD = any, RD = any, E = any | unknown, MD = any> = (
  payload: ApiCallerPayload<SD, RD, E>
) => Promise<AppResponse<RD, MD> | undefined>;

export type ApiCaller<SD = any, RD = any, E = any, MD = any> = (
  payload: ApiCallerPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD, MD>
) => Promise<AppResponse<RD, MD>>;
