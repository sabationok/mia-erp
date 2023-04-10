import { IBase } from './global.types';


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

export const countsTypesMap = {
  PASSIVE: 'ПАСИВНИЙ',
  ACTIVE: 'АКТИВНИЙ',
};

export type CountType = keyof typeof countsTypesMap;
