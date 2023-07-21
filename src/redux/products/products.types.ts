import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { CurrencyCode } from '../transactions/transactions.types';

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

export interface IProductBase extends IBase {
  amount?: number;
  type?: ProductType;
  currency?: CurrencyCode;
  status?: ProductStatus;
  tags?: string[];
}

export interface IProduct extends IProductBase {
  eventDate?: number | string | Date;
  countIn?: any;
  subCountIn?: any;
  countOut?: any;
  subCountOut?: any;
  category?: any;
  subCategory?: any;
  contractor?: any;
  project?: any;
  document?: any;
  archived?: boolean;
  visible?: boolean;
  status?: ProductStatus;
  description?: string;
  tags?: string[];
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
