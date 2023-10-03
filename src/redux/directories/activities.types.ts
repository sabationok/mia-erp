import { IBaseDirItem } from '../../components/Directories/dir.types';

export interface IActivity extends IBaseDirItem {}

export interface IActivityFormData extends Omit<IActivity, '_id' | 'createdAt' | 'updatedAt'> {}
