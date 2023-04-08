import { IBase } from './global.types';

export interface IContractor extends IBase {
  name?: string;
  label?: string;
  email?: string;
  phone?: string
  type?: string;
  descr?: string;
  tags?: string[],
}