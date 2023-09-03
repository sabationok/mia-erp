import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { CurrencyCode } from '../transactions/transactions.types';
import { IBaseDirItem, IProductCategoryDirItem, IPropertyDirItem } from '../../components/Directories/dir.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { ICompany } from '../companies/companies.types';
import { IProductInventory, IWarehouse } from '../warehouses/warehouses.types';
import { IBrand } from '../directories/brands.types';
import { IUser } from '../auth/auth.types';
import { ApiDirType } from '../APP_CONFIGS';
import { AppQueryParams } from '../../api';

export type ProductStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export enum ProductTypeEnum {
  SERVICE = 'SERVICE',
  GOODS = 'GOODS',
  SET = 'SET',
}

export type ProductFilterOpt = FilterOpt<ProductTypeEnum>;

export interface IProductBase extends IBase {
  owner?: ICompany;
  author?: IUser;
  editor?: IUser;

  label: string;
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
}

export interface IProduct extends IProductBase {
  category?: IProductCategoryDirItem;
  subCategory?: IProductCategoryDirItem;

  brand?: IBrand;
  // supplier?: IContractor;
  // contractor?: IContractor;
  warehouses?: IWarehouse;
  variations?: IVariation[];
  hasVariations?: boolean;
  template?: IVariationsTemplateDirItem;

  unitsOfMeasurement?: string;

  prices?: IPriceListItem[];
  productInventory?: IProductInventory;

  images?: ProductImage[];
}

export type ProductImage = { img_preview?: string; img_1x: string; img_2x: string; webp: string };

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

export interface IAllProductsRes extends AppResponse<IProduct[]> {}

export interface IProductRes extends AppResponse<IProduct> {}

export interface ICreateProductRes extends AppResponse<IProduct> {}

// ? PROPERTIES ================================================
export interface IProperty extends IBase {
  label?: string;
  type?: ProductTypeEnum;
  isSelectable?: boolean;

  parent?: IProperty;
  childrenList?: IProperty[];
}

export interface IPropertyDto {
  label?: string;
  type?: ProductTypeEnum;
  isSelectable?: boolean;
  parent?: OnlyUUID;
}

export interface IPropertyReqData {
  _id?: string;
  data?: IPropertyDto;
  params?: AppQueryParams;
}

// ? VARIATIONS +===========================
export interface IVariation extends IBase {
  owner?: ICompany;
  product?: IProduct;
  productInventories?: IProductInventory[];

  properties?: Omit<IProperty, 'childrenList'>[];

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}
export interface VariationDto {
  product?: OnlyUUID;
  properties?: OnlyUUID[];

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}

export interface IVariationReqData {
  _id?: string;
  data: VariationDto;
}

export interface IVariationsTemplate {
  owner?: ICompany;
  label?: string;
  properties?: IVariationProperty;
}

// ? VARIATIONS TABLE TEMPLATES
export interface IVariationsTemplateDirItem extends IBaseDirItem<ApiDirType.VARIATIONS_TEMPLATES> {
  properties?: IVariationProperty[];
}
export interface IVariationProperty extends IPropertyDirItem {
  isSelectable?: boolean;
}

export interface IVariationsTemplateFormData
  extends Omit<IVariationsTemplateDirItem, '_id' | 'createdAt' | 'updatedAt' | 'childrenList'> {}

// export interface DirVariationsTemplatesProps
//   extends IDirInTreeProps<
//     ApiDirType.VARIATIONS_TEMPLATES,
//     any,
//     IVariationsTemplateFormData,
//     IVariationsTemplateFormData,
//     IVariationsTemplateDirItem
//   > {}
export interface IAllVariationsTemplatesRes extends AppResponse<IVariationsTemplate[]> {}
export interface IVariationsTemplateRes extends AppResponse<IVariationsTemplate> {}
export interface IAllVariationsRes extends AppResponse<IVariation[]> {}
export interface IVariationRes extends AppResponse<IVariation> {}
