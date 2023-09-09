import { IBase } from '../global.types';
import { ICompany } from '../companies/companies.types';
import { IProductInventory } from '../warehouses/warehouses.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { AppQueryParams } from '../../api';
import { IProduct } from './products.types';
import { IPropertyValue } from './properties.types';

export interface IVariation extends IBase {
  owner?: ICompany;
  product?: IProduct;
  productInventories?: IProductInventory[];

  properties?: IPropertyValue[];

  price?: IPriceListItem;

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}
export interface VariationDto {
  properties?: string[];

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
}

export interface IVariationReqData {
  _id?: string;
  data: VariationDto;
  params?: AppQueryParams;
}
