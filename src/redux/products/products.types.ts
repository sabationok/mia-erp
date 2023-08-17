import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { CurrencyCode } from '../transactions/transactions.types';
import { IProductCategoryDirItem } from '../../components/Directories/dir.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { ICompany } from '../companies/companies.types';
import { IProductInventory, IWarehouse } from '../warehouses/warehouses.types';
import { IBrand } from '../directories/brands.types';
import { IUser } from '../auth/auth.types';

export type ProductStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export enum StorageItemTypeEnum {
  SERVICE = 'SERVICE',
  GOODS = 'GOODS',
}
export enum ProductTypeEnum {
  SERVICE = 'SERVICE',
  GOODS = 'GOODS',
  SET = 'SET',
}

export type ProductFilterOpt = FilterOpt<ProductTypeEnum>;

export interface IStorageItemBase extends IBase {
  author?: IUser;
  editor?: IUser;

  type?: ProductTypeEnum;
  status?: ProductStatus;
  approvedStatus?: ProductStatus;
  archived?: boolean;
  visible?: boolean;
  description?: string;
  tags?: string[];
}

export interface IStorageItem extends IStorageItemBase {
  label: string;
  sku?: string;
  barCode?: string;
  qrCode?: string;

  owner?: ICompany;

  category?: IProductCategoryDirItem;
  subCategory?: IProductCategoryDirItem;

  brand?: IBrand;
  // supplier?: IContractor;
  // contractor?: IContractor;
  warehouses?: IWarehouse;

  unitsOfMeasurement?: string;

  prices?: IPriceListItem[];
  productInventory?: IProductInventory;

  images?: ProductImage[];
}

export type ProductImage = { img_preview?: string; img_1x: string; img_2x: string; webp: string };

export interface IStorageItemFroReq {
  type?: ProductTypeEnum;
  currency?: CurrencyCode;
  status?: ProductStatus;

  category?: OnlyUUID;
  parentCategory?: OnlyUUID;

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
