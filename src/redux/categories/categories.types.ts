import { IBase } from '../global.types';

export interface ICategory extends IBase {
  name?: string;
  label?: string;
  type?: CategoryTypes;
  description?: string;
  def?: string;
  owner?: ICategory;
}

export interface ICategoryFormData
  extends Omit<ICategory, '_id' | 'createdAt' | 'updatedAt' | 'owner'> {
  owner?: string | null;
}

export const CategoriesTypesMap = {
  INCOME: 'ДОХІД',
  TRANSFER: 'ПЕРЕКАЗ',
  EXPENSE: 'ВИТРАТА',
};

export type CategoryTypes = keyof typeof CategoriesTypesMap;
