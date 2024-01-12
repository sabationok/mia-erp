import { MeasurementUnit } from './products.types';
import { AddressDto, IBase, OnlyUUID } from '../redux/global.types';
import { ServiceMethodBase } from './integrations.types';
import { ICompany } from './companies.types';
import { LangPack } from '../lang';
import { Path } from 'react-hook-form';

export enum CurrencyCode {
  UAH = 'UAH',
  EUR = 'EUR',
  USD = 'USD',
}

export type EntityPath<Entity> = Path<Entity>;

export type AppDate = string | number | Date;

export type MaybeNull<T = any> = T | null;

export type MaybeArr<T = any> = T extends (infer U)[] ? U[] : T;

export interface HasCurrencyCode {
  currency?: MaybeNull<CurrencyCode>;
}
export interface EmbeddedReference {
  internal?: MaybeNull<string>;
  external?: MaybeNull<string>;
}

export interface HasEmbeddedReference {
  reference?: MaybeNull<EmbeddedReference>;
}

export interface DisabledStates {
  all?: MaybeNull<boolean>;
  customer?: MaybeNull<boolean>;
  company?: MaybeNull<boolean>;
}
export interface HasDisabledAttributes {
  disabledFor?: MaybeNull<DisabledStates>;
}

export interface HasOwnerAsCompany {
  owner?: MaybeNull<ICompany>;
}

export interface HasAuthor {
  author?: MaybeNull<IBase & { user?: IBase & { name?: string; email?: string } }>;
}

export interface HasEditor {
  editor?: MaybeNull<IBase & { user?: IBase & { name?: string; email?: string } }>;
}

export interface HasManager {
  manager?: MaybeNull<IBase & { user?: IBase & { name?: string; email?: string } }>;
}

export interface HasCompany extends IBase, HasOwnerAsCompany, HasAuthor, HasEditor {}

export interface HasDestination {
  destination?: AddressDto;
}

export interface HasDestinationRefs {
  destinationRefs?: Record<keyof AddressDto, OnlyUUID>;
}

export interface HasStatus<Status extends string | number = string> {
  status?: MaybeNull<Status>;
}

export interface HasEmbeddedStatus<Status extends object = object> {
  status?: MaybeNull<Status>;
}

export interface HasError<Error extends string | number = string> {
  status?: MaybeNull<Error>;
}

export interface HasEmbeddedError<Error extends object = object> {
  error?: MaybeNull<Error>;
}

export interface HasStatusRef {
  status: MaybeNull<OnlyUUID>;
}

export interface HasType<Type extends string | number = string> {
  type?: MaybeNull<Type>;
}

export interface HasCategory<Type extends string | number = string> {
  category?: MaybeNull<Type>;
}

export type EmbeddedType<Internal extends string = string, External extends string = string> = {
  internal?: MaybeNull<Internal>;
  external?: MaybeNull<External>;
};
export interface HasEmbeddedType<Internal extends string = string, External extends string = string> {
  type?: MaybeNull<{ internal?: MaybeNull<Internal>; external?: MaybeNull<External> }>;
}

export interface IMeasurement {
  min?: MaybeNull<number>;
  max?: MaybeNull<number>;
  step?: MaybeNull<number>;
  unit?: MaybeNull<MeasurementUnit>;
}

export type MeasurementKeyType = keyof IMeasurement;

export interface IDimensions {
  width?: MaybeNull<number>;
  height?: MaybeNull<number>;
  length?: MaybeNull<number>;
  weight?: MaybeNull<number>;
}

export type DimensionsKeyType = keyof IDimensions;

export interface HasMeasurement {
  measurement?: MaybeNull<IMeasurement>;
}

export interface HasDimensions {
  dimensions?: MaybeNull<IDimensions>;
}
export interface HasTotal {
  total?: MaybeNull<number>;
}

export interface HasSummary<T extends object> {
  summary?: MaybeNull<T>;
}

export interface HasQuantity {
  quantity?: MaybeNull<number>;
}

export interface WithPeriod {
  timeFrom?: MaybeNull<AppDate>;
  timeTo?: MaybeNull<AppDate>;
}

export interface HasExpireDate {
  expireAt?: MaybeNull<AppDate>;
}

export interface HasExpireTime {
  expiresIn?: MaybeNull<AppDate>;
}

export interface HasExecuteDate {
  executeAt?: MaybeNull<AppDate>;
}
export interface HasOrigin<Type = any> {
  origin?: MaybeNull<Type>;
}

export interface HasExtRef {
  extRef?: MaybeNull<string>;
}

export interface HasMethod<Method extends ServiceMethodBase = any> {
  method?: MaybeNull<Method>;
}

export interface HasName {
  name?: MaybeNull<string>;
}
export interface IEmbeddedName {
  first?: MaybeNull<string>;
  second?: MaybeNull<string>;
  middle?: MaybeNull<string>;
}

export interface HasEmbeddedName {
  name?: MaybeNull<IEmbeddedName>;
}

// ? LABEL
export interface HasLabel {
  label?: MaybeNull<string>;
}
export interface IEmbeddedLabel {
  base?: MaybeNull<string>;
  print?: MaybeNull<string>;
}
export interface HasEmbeddedLabel {
  label?: MaybeNull<IEmbeddedLabel>;
}

export interface HasLabelsLangPack {
  labels?: MaybeNull<LangPack>;
}
export interface HasTaxCode {
  taxCode?: MaybeNull<{ corp?: MaybeNull<string>; personal?: MaybeNull<string> }>;
}
export interface HasMagicLink {
  magicLink?: MaybeNull<string>;
}
export interface References<Internal = any, External = any> {
  internal?: MaybeNull<Internal>;
  external?: MaybeNull<External>;
}
export interface HasEmbeddedReferences<Internal = any, External = any> {
  reference?: MaybeNull<References<Internal, External>>;
}

export interface HasDescription {
  description?: MaybeNull<string>;
}

export interface HasSortOrder {
  sortOrder?: number;
}

export interface HasSlotsList<Slot = any> {
  slots?: MaybeNull<Slot[]>;
}

export interface HasAmount {
  amount?: MaybeNull<number>;
}

export interface HasIsValidFlag {
  isValid?: MaybeNull<boolean>;
}

export interface FormDataLocationRef {
  ref: string;
  label: string;
}
export type FormDataLocationRefs = Record<keyof LocationRefsDto, FormDataLocationRef>;

export interface LocationRefsDto {
  country?: string;
  area?: string;
  city?: string;
  street?: string;
}

// ??? Experimental

export type HasNamedList<Key extends string | number = any, Data = any> = Record<Key, MaybeNull<Data[]>>;

export type T_HasSlotsList<Slot = any> = HasNamedList<'slots', Slot>;
