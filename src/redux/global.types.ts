import { ThunkPayload } from './store.store';

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

export interface AppResponse<D = any, M = any> {
  meta: M & {};
  data: D & {};
}

export type CompanyQueryType = 'own' | 'all' | 'invites' | 'invited';
export type ServiceDispatcher<SD = any, RD = any, E = any> = (payload: ThunkPayload<SD, RD, E>) => void;
