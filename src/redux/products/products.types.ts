import { AppResponse, IBase, OnlyUUID } from '../global.types';
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
  hasVariations?: boolean;
  prices?: IPriceListItem[];
  productInventories?: IProductInventory[];
}

export type ProductImage = { img_preview?: string; img_1x: string; img_2x: string; webp: string };

export interface IProductFormData {
  type?: ProductTypeEnum;
  currency?: CurrencyCode;
  status?: ProductStatus;

  category?: Omit<IProductCategoryDirItem, 'childrenList'>;

  tags?: string[];
  brand?: OnlyUUID;

  defaults?: {
    warehouse?: IWarehouse;
    price?: IPriceListItem;
    variation?: IVariation;
    supplier?: IContractor;
  };
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

export interface IAllProductsRes extends AppResponse<IProduct[]> {}

export interface IProductRes extends AppResponse<IProduct> {}

export interface ICreateProductRes extends AppResponse<IProduct> {}

// ? PROPERTIES ================================================

export interface IPropertyBase extends IBase {
  label?: string;
  type?: ProductTypeEnum;
  isSelectable?: boolean;
}

export interface IVariationTemplate extends IPropertyBase {
  childrenList?: IProperty[];
}
export interface IProperty extends IPropertyBase {
  parent?: IVariationTemplate;
  childrenList?: IPropertyValue[];
}

export interface IPropertyValue extends IPropertyBase {
  parent?: IProperty;
}

export interface IPropertyDto {
  label?: string;
  type?: ProductTypeEnum;
  isSelectable?: boolean;
  parent?: OnlyUUID;
  description?: string;
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

  price?: IPriceListItem;

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}
export interface VariationDto {
  properties?: OnlyUUID[];

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}

export interface IVariationReqData {
  _id?: string;
  data: VariationDto;
  params?: AppQueryParams;
}

// export interface IVariationsTemplate {
//   owner?: ICompany;
//   label?: string;
//   properties?: IVariationProperty;
// }

// ? VARIATIONS TABLE TEMPLATES
// export interface IVariationsTemplateDirItem extends IBaseDirItem<ApiDirType.VARIATIONS_TEMPLATES> {
//   properties?: IVariationProperty[];
// }
// export interface IVariationProperty extends IProperty {}

// export interface IVariationsTemplateFormData
//   extends Omit<IVariationsTemplateDirItem, '_id' | 'createdAt' | 'updatedAt' | 'childrenList'> {}

// export interface DirVariationsTemplatesProps
//   extends IDirInTreeProps<
//     ApiDirType.VARIATIONS_TEMPLATES,
//     any,
//     IVariationsTemplateFormData,
//     IVariationsTemplateFormData,
//     IVariationsTemplateDirItem
//   > {}
