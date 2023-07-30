import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ApiDirType } from '../APP_CONFIGS';
import { IBase } from '../global.types';

export interface DefaultDirectoryType extends IBase {
  _id: string;
  label: { en: string; ua?: string };
  disabled?: boolean;
}

export interface ICategory extends IBaseDirItem<CategoryTypes, ApiDirType.CATEGORIES_TR> {}

export interface ICategoryFormData extends Omit<ICategory, '_id' | 'createdAt' | 'updatedAt'> {}

export enum CategoryTrTypeEnum {
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
  EXPENSE = 'EXPENSE',
}

export type CategoryTypes = keyof typeof CategoryTrTypeEnum;
