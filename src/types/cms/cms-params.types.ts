import {
  HasAvailableFor,
  HasDisableFor,
  HasType,
  IBase,
  IEmbeddedLabel,
  IEmbeddedName,
  MaybeNull,
  OnlyUUID,
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
  keyWords?: string[];
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
    HasDisableFor,
    HasAvailableFor {}

export interface HasCmsParams<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> {
  cmsParams?: MaybeNull<CmsParamsEntity<Key, Type, Extra>>;
}

export interface CmsParamsDto<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> extends Omit<CmsParamsEntity<Key, Type, Extra>, keyof IBase>,
    Partial<OnlyUUID> {}

export type UpdateCmsParamsDto<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> = OnlyUUID & CmsParamsDto<Key, Type, Extra>;

export interface HasCreateCmsParamsDto<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> {
  cmsParams?: CmsParamsDto<Key, Type, Extra>;
}

export interface HasUpdateCmsParamsDto<
  Key extends string = string,
  Type extends string = string,
  Extra extends CmsParamsExtra = CmsParamsExtra,
> {
  cmsParams?: UpdateCmsParamsDto<Key, Type, Extra>;
}
