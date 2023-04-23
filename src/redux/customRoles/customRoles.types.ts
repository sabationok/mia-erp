import { IBase } from '../global.types';

export interface ICustomRole extends IBase {
  label?: string;
  name?: string;
  actions?: string[];
  descr?: string;
}
