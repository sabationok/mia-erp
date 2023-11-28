import { IBase } from '../redux/global.types';
import { LangPack } from '../lang';

export interface ICmsBaseConfigs extends Partial<IBase> {
  key: string;
  labels?: LangPack;
}
export interface CmsBaseConfigsDto {
  key: string;
  labels?: LangPack;
}

export interface HasBaseCmsConfigs<Configs = ICmsBaseConfigs> {
  cmsConfigs?: Configs & ICmsBaseConfigs;
}

export interface HasBaseCmsConfigsDto<Configs = CmsBaseConfigsDto> {
  cmsConfigs?: Configs & CmsBaseConfigsDto;
}
