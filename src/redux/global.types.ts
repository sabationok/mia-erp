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

export interface AppResponse<D = any, M = any>
  extends AxiosResponse<{
    meta: M;
    data: D;
  }> {}

export type CompanyQueryType = 'own' | 'all' | 'invites' | 'invited';

export type ServiceDispatcher<SD = any, RD = any, E = any> = (payload: ThunkPayload<SD, RD, E>) => void | any;

export type ServiceDispatcherAsync<SD = any, RD = any, E = any> = (payload: ThunkPayload<SD, RD, E>) => Promise<
  | {
      payload: RD;
      type: string | any;
    }
  | any
>;
export type GetResponseCallback<SD = any, RD = any, MD = any> = (args?: SD) => Promise<AppResponse<RD, MD>>;

export type ServiceApiCaller<SD = any, RD = any, E = any, MD = any> = (
  payload: ThunkPayload<SD, RD, E>
) => Promise<AppResponse<RD, MD> | undefined>;

export type ApiCaller<SD = any, RD = any, E = any, MD = any> = (
  payload: ThunkPayload<SD, RD, E>,
  getResponseCallback: GetResponseCallback<SD, RD>
) => Promise<AppResponse<RD, MD>>;
