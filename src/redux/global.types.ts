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
    meta: M & {};
    data: D & {};
  }> {
}

export type CompanyQueryType = 'own' | 'all' | 'invites' | 'invited';
export type ServiceDispatcher<SD = any, RD = any, E = any> = (payload: Partial<ThunkPayload<SD, RD, E>>) => void;
