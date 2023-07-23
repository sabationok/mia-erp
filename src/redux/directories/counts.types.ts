import { AppResponse } from '../global.types';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ApiDirType } from '../APP_CONFIGS';

export interface ICount extends IBaseDirItem<CountType, ApiDirType.COUNTS> {
  balance?: number;
  code?: number | string;
}

export enum CountsTypesEnum {
  PASSIVE = 'PASSIVE',
  ACTIVE = 'ACTIVE',
}

export type CountType = keyof typeof CountsTypesEnum;

export interface ICountFormData extends Omit<ICount, '_id' | 'createdAt' | 'updatedAt' | 'parent'> {
  parent?: ICount;
  balance?: number;
  currency?: string;
}

export interface IGetAllCountsRes extends AppResponse<ICount[]> {}

export interface ICreateCountThunkRes extends AppResponse<ICount> {}

export interface IDeleteCountThunkRes extends AppResponse<{ _id: string }> {}
