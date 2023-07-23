import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { CurrencyCode } from '../transactions/transactions.types';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ContractorsTypesEnum } from '../contractors/contractors.types';
import { ApiDirType } from '../APP_CONFIGS';

export type ProductType = 'DEFAULT' | 'CUSTOM';

export interface IProject extends IBase {
  name?: string;
  label?: string;
  type?: string;
  def?: string;
}

export interface IDocument extends IBase {
  name?: string;
  label?: string;
  number?: string;
  type?: string;
}

export type ProductStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export enum ProductTypeEnum {
  DEFAULT = 'DEFAULT',
  COMMISSION = 'COMMISSION',
  COMMISSION_FIX = 'COMMISSION_FIX',
}

export type ProductPriceType = 'COMMISSION' | 'DEFAULT' | 'COMMISSION_FIX' | ProductTypeEnum;

export interface IProductBase extends IBase {
  price?: number;
  priceType?: ProductPriceType;
  type?: ProductType;
  currency?: CurrencyCode;
  status?: ProductStatus;
  archived?: boolean;
  visible?: boolean;
  description?: string;
  tags?: string[];
}

export interface IProduct extends IProductBase {
  eventDate?: number | string | Date;

  label: string;
  sku?: string;

  category?: IBaseDirItem<any, ApiDirType.CATEGORIES_PROD>;
  subCategory?: IBaseDirItem<any, ApiDirType.CATEGORIES_PROD>;

  brand?: IBaseDirItem<any, ApiDirType.BRANDS>;
  supplier?: IBaseDirItem<ContractorsTypesEnum, ApiDirType.CONTRACTORS>;
  contractor?: IBaseDirItem<ContractorsTypesEnum, ApiDirType.CONTRACTORS>;
  document?: any;
}

export interface IProductForReq extends Partial<Record<keyof IProduct, any>> {
  eventDate?: number | Date;
  amount?: number;
  type?: ProductType;
  currency?: CurrencyCode;
  status?: ProductStatus;
  tags?: string[];
  countIn?: OnlyUUID;
  subCountIn?: OnlyUUID;
  countOut?: OnlyUUID;
  subCountOut?: OnlyUUID;
  category?: OnlyUUID;
  subCategory?: OnlyUUID;
  contractor?: OnlyUUID;
  project?: OnlyUUID;
  document?: OnlyUUID;
  companyActivity?: OnlyUUID;
  comment?: OnlyUUID;
}

export interface IProductReqData {
  _id?: string;
  data: IProductForReq;
}

export interface IAllProductsRes extends AppResponse<IProduct[]> {}

export interface IProductRes extends AppResponse<IProduct> {}

export interface ICreateProductRes extends AppResponse<IProduct> {}
