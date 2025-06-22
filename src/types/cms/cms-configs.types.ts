import { LangPack } from 'i18e';
import { HasDisableFor, MaybeNull } from '../utils.types';

export interface ICmsBaseConfigs<Key extends string = string> {
  key: MaybeNull<Key>;
  labels?: MaybeNull<Partial<LangPack>>;
}

export interface CmsBaseConfigsDto extends HasDisableFor {
  key: string;
  extKey?: string;

  labels?: LangPack;

  description?: LangPack;

  extRef?: string;
}

export interface HasBaseCmsConfigs<Key extends string = string, Configs = ICmsBaseConfigs> {
  cmsConfigs?: Configs & ICmsBaseConfigs<Key>;
}
