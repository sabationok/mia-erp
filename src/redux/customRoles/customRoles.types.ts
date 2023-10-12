import { IBase } from '../global.types';
import { ICompanyBase } from '../companies/companies.types';

export type RoleActionType = {
  _id?: string;
  label?: string;
  value?: string;
  type?: string;
};
export type RoleAccessKeyType = string;

export interface ICustomRole extends IBase {
  owner?: ICompanyBase;
  label?: string;
  expireAt?: Date | string | number;
  description?: string;
  actions?: string[];
  accessKeys?: RoleAccessKeyType[];
}
