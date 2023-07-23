import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ApiDirType } from '../APP_CONFIGS';
import { OnlyUUID } from '../global.types';

export interface ICategory extends IBaseDirItem<CategoryTypes, ApiDirType.CATEGORIES_TR> {}

export interface ICategory extends IBaseDirItem<CategoryTypes, ApiDirType.CATEGORIES_TR> {}

export interface ICategoryFormData extends Omit<ICategory, '_id' | 'createdAt' | 'updatedAt' | 'parent'> {
  parent?: OnlyUUID;
}

export enum CategoriesTypesEnum {
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
  EXPENSE = 'EXPENSE',
  AUDIT_FIX = 'AUDIT_FIX',
}

export type CategoryTypes = keyof typeof CategoriesTypesEnum;
