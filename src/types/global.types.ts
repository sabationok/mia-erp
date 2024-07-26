import { UUID } from '../redux/app-redux.types';
import { AppDate, MaybeNull } from './utils.types';

export interface OnlyUUID {
  _id: UUID;
}
export type ArrayOfUUID = Array<string>;
export type ArrayOfObjUUID = Array<OnlyUUID>;

export type IdKeyVersion = '_id' | 'id';
export type ObjUUID<K extends IdKeyVersion = '_id'> = Record<K, string>;
export interface IBase extends OnlyUUID {
  createdAt?: MaybeNull<AppDate>;
  updatedAt?: MaybeNull<AppDate>;
  deletedAt?: MaybeNull<AppDate>;
}

export type IBaseKeys = keyof Omit<IBase, '_id'>;
