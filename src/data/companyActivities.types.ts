import { IBase } from './global.types';


export interface ICompanyActivity extends IBase {
  name?: string;
  label?: string;
  type?: string;
  def?: string;
  descr?: string;
}

export interface ICompanyActivityFormData extends Omit<ICompanyActivity, '_id' | 'createdAt' | 'updatedAt'> {
}