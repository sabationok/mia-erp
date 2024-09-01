import { IBase } from '../app-redux.types';
import { ICompanyBase } from '../../types/companies/companies.types';
import { LangPack } from '../../i18e';

export enum ModuleName {
  counterparties = 'counterparties',
  customers = 'customers',
  pricing = 'pricing',
  warehousing = 'warehousing',
  orders = 'orders',
  products = 'products',
  offers = 'offers',
  refunds = 'refunds',
  finances = 'finances',
  supplement = 'supplement',
}
export enum RouteActionsEnum {
  read = 'read',
  readOwn = 'readOwn',
  readDeleted = 'readDeleted',
  readDeletedOwn = 'readDeletedOwn',
  create = 'create',
  update = 'update',
  updateOwn = 'updateOwn',
  delete = 'delete',
  deleteOwn = 'deleteOwn',
  deleteSoft = 'deleteSoft',
  deleteSoftOwn = 'deleteSoftOwn',
}
export interface ModuleWithActions {
  label: ModuleName | string;
  labels: LangPack;
  actions?: RoleActionType[];
}
export interface RoleActionType {
  _id?: RouteActionsEnum | string;

  label: RouteActionsEnum | string;

  labels: LangPack;

  value?: RouteActionsEnum;

  type?: RouteActionsEnum;
}

export type RoleAccessKeyType = string;

export interface ICustomRole extends IBase {
  owner?: ICompanyBase;
  label?: string;
  expireAt?: Date | string | number;
  description?: string;
  actions: string[];
  accessKeys?: RoleAccessKeyType[];
}
