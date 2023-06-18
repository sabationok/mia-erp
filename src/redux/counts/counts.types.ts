import { AppResponse } from '../global.types';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ApiDirType } from '../APP_CONFIGS';

export interface ICount extends IBaseDirItem<CountType, ApiDirType.counts> {
  balance?: number;
  code?: number | string;
}

export type CountType = 'PASSIVE' | 'ACTIVE';
export const CountsTypesMap = {
  PASSIVE: 'ПАСИВНИЙ',
  ACTIVE: 'АКТИВНИЙ',
};

export interface IGetAllCountsRes extends AppResponse<ICount[]> {}

export interface ICreateCountThunkRes extends AppResponse<ICount> {}

export interface IDeleteCountThunkRes extends AppResponse<{ _id: string }> {}
