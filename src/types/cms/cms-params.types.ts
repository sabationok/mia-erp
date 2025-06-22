import {
  HasAvailableFor,
  HasDisableFor,
  HasType,
  IBase,
  IEmbeddedLabel,
  IEmbeddedName,
  MaybeNull,
} from 'types/global.types';
import { PartialRecord } from '../utils.types';
import { LangPack } from 'i18e';

interface NameCmsParams extends PartialRecord<keyof IEmbeddedName, LangPack> {}
interface LabelCmsParams extends PartialRecord<keyof IEmbeddedLabel, LangPack> {}

export type CmsParamsExtra = Record<string, any>;

export interface CmsParamsBase<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> extends HasDisableFor,
    HasType<Type> {
  key: Key;
  label?: LabelCmsParams;
  labels?: LabelCmsParams;
  name?: NameCmsParams;
  extra?: Extra;
}
export interface CmsParamsEntity<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> extends IBase,
    CmsParamsBase<Key, Type, Extra>,
    Omit<CmsParamsDto, 'key' | 'type'>,
    HasDisableFor,
    HasAvailableFor {}

export interface HasCmsParams<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> {
  cmsParams?: MaybeNull<CmsParamsEntity<Key, Type, Extra>>;
}

export interface CmsParamsDto {
  key: string;
  type?: string;
  extKey?: string;

  labels?: LabelCmsParams;
  label?: LabelCmsParams;
  name?: NameCmsParams;

  description?: LangPack;

  extRef?: string;
}
