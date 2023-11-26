import { IBase } from '../global.types';
import { LangPack } from '../../lang';

export interface ICmsBaseConfigs extends Partial<IBase> {
  key: string;
}
export interface CmsBaseConfigsDto {
  key: string;
  labels?: LangPack;
}
