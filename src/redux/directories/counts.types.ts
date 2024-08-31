import { ApiAxiosResponse } from '../app-redux.types';
import { IDirItemBase } from '../../types/dir.types';
import { ApiDirType } from '../APP_CONFIGS';

export interface ICount extends IDirItemBase<ApiDirType.COUNTS> {
  balance?: number;
  code?: number | string;
}

export enum CountsTypesEnum {
  PASSIVE = 'PASSIVE',
  ACTIVE = 'ACTIVE',
}

export type CountType = keyof typeof CountsTypesEnum | CountsTypesEnum;

export interface ICountFormData extends Omit<ICount, '_id' | 'createdAt' | 'updatedAt' | 'parent'> {
  parent?: ICount;
  balance?: number;
  currency?: string;
}

export interface IGetAllCountsRes extends ApiAxiosResponse<ICount[]> {}

export interface ICreateCountThunkRes extends ApiAxiosResponse<ICount> {}

export interface IDeleteCountThunkRes extends ApiAxiosResponse<{ _id: string }> {}
