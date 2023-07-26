import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { CurrencyCode } from '../transactions/transactions.types';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ContractorsTypesEnum } from '../contractors/contractors.types';
import { ApiDirType } from '../APP_CONFIGS';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';

export type StorageItemStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export enum StorageItemTypeEnum {
  SERVICE = 'SERVICE',
  GOODS = 'GOODS',
}

export type StorageItemType = keyof typeof StorageItemTypeEnum;

export type StorageItemFilterOption = FilterOpt<StorageItemType>;
export type ProductFilterOpt = StorageItemFilterOption;

export enum StorageItemPriceTypeEnum {
  DEFAULT = 'DEFAULT',
  COMMISSION = 'COMMISSION',
  COMMISSION_FIX = 'COMMISSION_FIX',
}

export type StorageItemPriceType = 'COMMISSION' | 'DEFAULT' | 'COMMISSION_FIX';

export interface IStorageItemBase extends IBase {
  price?: number;
  priceType?: StorageItemPriceType;
  type?: StorageItemType;
  currency?: CurrencyCode;
  status?: StorageItemStatus;
  archived?: boolean;
  visible?: boolean;
  description?: string;
  tags?: string[];
  isService?: boolean;
}

export interface IStorageItem extends IStorageItemBase {
  label: string;
  sku?: string;

  category?: IBaseDirItem<any, ApiDirType.CATEGORIES_PROD>;
  subCategory?: IBaseDirItem<any, ApiDirType.CATEGORIES_PROD>;

  brand?: IBaseDirItem<any, ApiDirType.BRANDS>;
  supplier?: IBaseDirItem<ContractorsTypesEnum, ApiDirType.CONTRACTORS>;
  contractor?: IBaseDirItem<ContractorsTypesEnum, ApiDirType.CONTRACTORS>;
  storages?: IBaseDirItem<any, ApiDirType.STORAGES>;

  images?: { img_1x: string }[];
}

export interface IStorageItemFroReq extends Partial<Record<keyof IStorageItem, any>> {
  type?: StorageItemType;
  currency?: CurrencyCode;
  status?: StorageItemStatus;
  tags?: string[];
  supplier?: OnlyUUID;
  brand?: OnlyUUID;
  document?: OnlyUUID;
}

export interface IProductForReq extends IStorageItemFroReq {}

export interface IProductReqData {
  _id?: string;
  data: IProductForReq;
}

export interface IStorageItemReqData {
  _id?: string;
  data: IStorageItemFroReq;
}

export interface IAllProductsRes extends AppResponse<IProduct[]> {}

export interface IProductRes extends AppResponse<IProduct> {}

export interface ICreateProductRes extends AppResponse<IProduct> {}

export type IProduct = IStorageItem;
