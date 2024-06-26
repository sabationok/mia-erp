import { LangPack } from '../lang';
import { MaybeNull } from './utils.types';

export interface ICmsBaseConfigs {
  key?: MaybeNull<string>;
  extRef?: MaybeNull<string>;
  labels?: MaybeNull<LangPack>;
}
export interface CmsBaseConfigsDto {
  key?: string;
  extRef?: string;
  labels?: LangPack;
}

export interface HasBaseCmsConfigs<Configs = ICmsBaseConfigs> {
  cmsConfigs?: Configs & ICmsBaseConfigs;
}

export interface HasBaseCmsConfigsDto<Configs = CmsBaseConfigsDto> {
  cmsConfigs?: Configs & CmsBaseConfigsDto;
}
