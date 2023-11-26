import { IBaseDirItem } from '../../types/dir.types';

export interface IActivity extends IBaseDirItem {}

export interface IActivityFormData extends Omit<IActivity, '_id' | 'createdAt' | 'updatedAt'> {}
