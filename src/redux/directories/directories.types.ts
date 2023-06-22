import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ApiDirType } from '../APP_CONFIGS';

export interface ICategory extends IBaseDirItem<CategoryTypes, ApiDirType.CATEGORIES_TR> {}

export interface ICategory extends IBaseDirItem<CategoryTypes, ApiDirType.CATEGORIES_TR> {}

export interface ICategoryFormData extends Omit<ICategory, '_id' | 'createdAt' | 'updatedAt' | 'parent'> {
  parent?: string | null;
}

export const CategoriesTypesMap = {
  INCOME: 'ДОХІД',
  TRANSFER: 'ПЕРЕКАЗ',
  EXPENSE: 'ВИТРАТА',
};

export type CategoryTypes = keyof typeof CategoriesTypesMap;
