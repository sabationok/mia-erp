import { IBase } from './global.types';

export type CategoryTypes = 'EXPENSE' | 'TRANSFER' | 'INCOME';
export interface ICategory extends IBase {
  name?: string;
  label?: string;
  type: CategoryTypes;
  descr?: string;
  def?: string;
  owner?: ICategory;
}
