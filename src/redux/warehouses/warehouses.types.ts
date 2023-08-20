import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { IProduct } from '../products/products.types';
import { ICompany } from '../companies/companies.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';

export enum WarehouseTypeEnum {
  WAREHOUSE = 'warehouse',
  STORE = 'store',
}
export interface IWarehouse extends IBase {
  owner?: ICompany;
  label: string;
  code?: string | number;
  type?: WarehouseTypeEnum;
  location?: string;
  items?: IProductInventory[];
}

export type VariationSTableStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IProductInventory extends IBase {
  owner?: ICompany;
  product?: Partial<IProduct>;

  stock?: number;
  reserved?: number;

  reservation?: boolean;
  hasVariations?: boolean;
  template?: IVariationTableTemplate;
  variations?: IVariation[];

  price?: IPriceListItem;

  timeFrom?: string;
  timeTo?: string;
}
export interface IProductInventoryDto {
  product?: Partial<IProduct>;
  status?: VariationSTableStatus;

  stock?: number;
  reserved?: number;

  reservation?: boolean;
  hasVariations?: boolean;
  template?: IVariationTableTemplate;

  customerTags?: string[];
  supplierTags?: string[];
  timeFrom?: string;
  timeTo?: string;
}

export interface IVariation extends IBase {
  owner?: ICompany;
  product?: IProduct;
  table?: OnlyUUID;

  stock?: number;
  reserved?: number;

  attribute_1?: IVariationTableTemplateOption;
  attribute_2?: IVariationTableTemplateOption;

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}
export interface VariationDto {
  product?: OnlyUUID;
  table?: OnlyUUID;

  stock?: number;
  reserved?: number;

  attribute_1?: OnlyUUID;
  attribute_2?: OnlyUUID;

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}
export interface IVariationTableTemplate {
  owner?: ICompany;
  label?: string;
  options?: IVariationTableTemplateOption;
}
export interface IVariationTableTemplateOption {
  table?: IVariationTableTemplate;
  label?: string;
  isColumn?: boolean;
}
export interface IWarehouseDto {
  label: string;
  code?: string;
}
export interface IWarehouseReqData {
  _id?: string;
  data: IWarehouseDto;
}
export interface IVariationReqData {
  _id?: string;
  data: VariationDto;
}

export interface IVariationReqData {
  _id?: string;
  data: VariationDto;
}

export interface ICreateVariationReqData {
  table: OnlyUUID;
  data: VariationDto;
}
export interface IAllWarehousesRes extends AppResponse<IWarehouse[]> {}
export interface IWarehouseRes extends AppResponse<IWarehouse> {}
export interface IAllVariationTableTemplatesRes extends AppResponse<IVariationTableTemplate[]> {}
export interface IVariationTableTemplateRes extends AppResponse<IVariationTableTemplate> {}
export interface IProductInventoriesRes extends AppResponse<IProductInventory[]> {}
export interface IProductInventoryRes extends AppResponse<IProductInventory> {}
export interface IAllVariationsRes extends AppResponse<IVariation[]> {}
export interface IVariationRes extends AppResponse<IVariation> {}
