import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ApiDirType } from '../APP_CONFIGS';

export enum BrandTypesEnum {
  DEFAULT = 'DEFAULT',
}

export type BrandTypes = 'DEFAULT' | BrandTypesEnum;

export interface IBrand extends IBaseDirItem<BrandTypes, ApiDirType.BRANDS> {}
