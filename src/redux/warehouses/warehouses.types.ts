import { AppResponse, IBase } from '../global.types';
import { IProduct, IVariation } from '../products/products.types';
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

export type VariationsStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IProductInventory extends IBase {
  owner?: ICompany;

  product?: Partial<IProduct>;
  variation?: IVariation;
  price?: IPriceListItem;

  stock?: number;
  reserved?: number;

  reservation?: boolean;

  timeFrom?: string;
  timeTo?: string;
}
export interface IProductInventoryDto {
  product?: Partial<IProduct>;
  variation?: IVariation;
  status?: VariationsStatus;

  stock?: number;
  reserved?: number;

  reservation?: boolean;

  customerTags?: string[];
  supplierTags?: string[];
  timeFrom?: string;
  timeTo?: string;
}

export interface IWarehouseDto {
  label: string;
  code?: string;
}
export interface IWarehouseReqData {
  _id?: string;
  data: IWarehouseDto;
}

export interface IAllWarehousesRes extends AppResponse<IWarehouse[]> {}
export interface IWarehouseRes extends AppResponse<IWarehouse> {}

export interface IProductInventoriesRes extends AppResponse<IProductInventory[]> {}
export interface IProductInventoryRes extends AppResponse<IProductInventory> {}
