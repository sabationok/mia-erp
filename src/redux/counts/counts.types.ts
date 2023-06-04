import { AppResponse, IBase } from '../global.types';

export interface ICount extends IBase {
  name?: string;
  label?: string;
  balance?: number;
  type?: CountType;
  code?: number | string;
  descr?: string;
  def?: string;
  owner?: ICount;
}

export const CountsTypesMap = {
  PASSIVE: 'ПАСИВНИЙ',
  ACTIVE: 'АКТИВНИЙ',
};

export type CountType = keyof typeof CountsTypesMap;

export interface IGetAllCountsRes extends AppResponse<ICount[]> {}

export interface ICreateCountThunkRes extends AppResponse<ICount> {}

export interface IDeleteCountThunkRes extends AppResponse<{ _id: string }> {}
