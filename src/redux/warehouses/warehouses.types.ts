import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { IProduct } from '../products/products.types';
import { ICompany } from '../companies/companies.types';

export interface IWarehouse extends IBase {
  owner?: ICompany;
  code?: string | number;
  location?: string;
  variationTables?: IVariationsTable[];
}

export type VariationSTableStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IVariationsTable extends IBase {
  owner?: ICompany;
  template?: IVariationTableTemplate;
  product?: Partial<IProduct>;
  variations?: IVariation[];

  totalStock?: number;
  totalReserved?: number;

  timeFrom?: string;
  timeTo?: string;
}
export interface IVariationTableDto {
  product?: Partial<IProduct>;
  status?: VariationSTableStatus;
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
  options?: IVariationTableTemplateOption;
}
export interface IVariationTableTemplateOption {
  table?: IVariationTableTemplate;
  label?: string;
  isColumn?: boolean;
}
export interface IWarehouseReqData {
  _id?: string;
  data: IWarehouse;
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
export interface IAllVariationsTablesRes extends AppResponse<IVariation[]> {}
export interface IVariationsTablesRes extends AppResponse<IVariation> {}
export interface IAllVariationsRes extends AppResponse<IVariation[]> {}
export interface IVariationRes extends AppResponse<IVariation> {}
