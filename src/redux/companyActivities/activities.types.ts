import { IBase } from '../global.types';


export interface IActivity extends IBase {
  name?: string;
  label?: string;
  type?: string;
  def?: string;
  descr?: string;
}

export interface IActivityFormData extends Omit<IActivity, '_id' | 'createdAt' | 'updatedAt'> {
  label: string;
}