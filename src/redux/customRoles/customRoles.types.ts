import { IBase } from '../global.types';
import { PagePathType } from '../../data/pages.data';

export type RoleActionType = {
  _id?: string;
  label?: string;
  value?: string;
  type?: string;
};
export type RoleAccessKeyType = PagePathType;

export interface ICustomRole extends IBase {
  label?: string;
  expireAt?: Date | string | number;
  description?: string;
  actions?: string[];
  accessKeys?: RoleAccessKeyType[];
}
