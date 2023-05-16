import { IBase } from '../global.types';
import { PagePathType } from '../../data/pages.data';

export type RoleActionType = string
export type RoleAccessKeyType = PagePathType

export interface ICustomRole extends IBase {
  label?: string;
  name?: string;
  descr?: string;
  actions: RoleActionType[];
  accessKeys: RoleAccessKeyType[];
}
