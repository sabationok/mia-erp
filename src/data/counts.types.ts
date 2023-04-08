import { IBase } from './global.types';

export type CountType = 'ACTIVE' | 'PASSIVE';
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