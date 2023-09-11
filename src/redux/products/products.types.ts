import { IBase, OnlyUUID } from '../global.types';
import { CurrencyCode } from '../transactions/transactions.types';
import { IProductCategoryDirItem } from '../../components/Directories/dir.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { ICompany } from '../companies/companies.types';
import { IProductInventory, IWarehouse } from '../warehouses/warehouses.types';
import { IBrand } from '../directories/brands.types';
import { IUser } from '../auth/auth.types';
import { AppQueryParams } from '../../api';
import { IContractor } from '../contractors/contractors.types';
import { IVariation } from './variations.types';
import { IVariationTemplate } from './properties.types';

export type ProductStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export enum ProductTypeEnum {
  GOODS = 'GOODS',
  SERVICE = 'SERVICE',
  SET = 'SET',
}

export type ProductFilterOpt = FilterOpt<ProductTypeEnum>;

export interface IProductBase extends IBase {
  owner?: ICompany;
  author?: IUser;
  editor?: IUser;

  label?: string;
  sku?: string;
  barCode?: string;
  qrCode?: string;

  type?: ProductTypeEnum;
  status?: ProductStatus;
  approvedStatus?: ProductStatus;
  archived?: boolean;
  visible?: boolean;
  description?: string;
  tags?: string[];

  images?: ProductImage[];

  defWarehouse?: IWarehouse;
  defPrice?: IPriceListItem;
  defVariation?: IVariation;
  defSupplier?: IContractor;
}

export interface IProduct extends IProductBase {
  category?: IProductCategoryDirItem;

  recommends?: IProduct[];
  brand?: IBrand;
  template?: IVariationTemplate;

  unitsOfMeasurement?: string;

  warehouses?: IWarehouse[];
  variations?: IVariation[];

  inventories?: IProductInventory[];

  hasVariations?: boolean;
  prices?: IPriceListItem[];
}

export type ProductImage = { img_preview?: string; img_1x: string; img_2x: string; webp: string };

export interface IProductFormData {
  type?: ProductTypeEnum;
  currency?: CurrencyCode;
  status?: ProductStatus;

  category?: Omit<IProductCategoryDirItem, 'childrenList'>;

  brand?: OnlyUUID;
  template?: OnlyUUID;

  label?: string;
  sku?: string;
  barCode?: string;
  qrCode?: string;
  unitsOfMeasurement?: string;
  approvedStatus?: ProductStatus;
  archived?: boolean;
  visible?: boolean;
  tags?: string[];
  description?: string;
  inventories?: IProductInventory[];

  defWarehouse?: IWarehouse;
  defPrice?: IPriceListItem;
  defVariation?: IVariation;
  defSupplier?: IContractor;
}

export interface IProductDto {
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

export interface IProductReqData {
  _id?: string;
  data?: IProductDto;
  params?: AppQueryParams;
}

// ? PROPERTIES ================================================
