import { AddressDto, IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment, IPaymentMethod } from '../payments/payments.types';
import { IInvoice } from '../invoices/invoices.types';
import { LangPack } from '../../lang';
import { AppQueryParams } from '../../api';
import { IProductDimensions } from '../products/products.types';

export enum ShipmentProviderEnum {
  ukrposhta = 'ukrposhta',
  novaposhta = 'novaposhta',
}
enum ShipmentStatusTypeEnum {}

export interface IShipment extends IBase {
  order?: IOrder;
  slots?: IOrderSlot[];

  payment?: IPayment;
  invoice?: IInvoice;
  ttn?: string;

  declaredValue?: number;
  contentTotalValue?: number;
  cost?: number;

  provider?: ShipmentProviderEnum;

  destination?: AddressDto;
  dimensions?: IProductDimensions;
  status?: ShipmentStatusTypeEnum;
  description?: string;

  method?: IShipmentMethod;
  paymentMethod?: IPaymentMethod;
}

export interface IShipmentMethod extends IBase {
  provider?: OnlyUUID;
  label?: string;
  lang?: LangPack;
  isDefault?: boolean;
  disabled?: boolean;
}

export interface IShipmentBaseDto {
  order?: OnlyUUID;
  slots?: string[];
  invoice?: OnlyUUID;

  ttn?: string;

  declaredValue?: number;
  contentTotalValue?: number;
  cost?: number;

  provider?: OnlyUUID;
  method?: OnlyUUID;

  destination?: AddressDto;

  description?: string;

  shipmentInvoice?: OnlyUUID;
  shipmentPayment?: OnlyUUID;
  paymentMethod?: OnlyUUID;
}
export interface IShipmentDto extends IShipmentBaseDto {
  payment?: OnlyUUID;
  invoice?: OnlyUUID;
  ttn?: string;

  destination?: AddressDto;
  dimensions?: IProductDimensions;
  status?: ShipmentStatusTypeEnum;
  description?: string;
}

export interface IShipmentBaseFormData {
  declaredValue?: number;
  contentTotalValue?: number;
  cost?: number;

  provider?: IFormDataValueWithUUID;
  method?: IFormDataValueWithUUID;

  destination?: AddressDto;

  description?: string;

  paymentMethod?: IFormDataValueWithUUID;
}
export interface IShipmentFormData extends IShipmentBaseFormData {
  order?: IFormDataValueWithUUID;
  slots?: string[];

  payment?: IFormDataValueWithUUID;
  invoice?: IFormDataValueWithUUID;
  ttn?: string;

  destination?: AddressDto;
  dimensions?: IProductDimensions;
  status?: ShipmentStatusTypeEnum;

  shipmentInvoice?: IFormDataValueWithUUID;
  shipmentPayment?: IFormDataValueWithUUID;
}

// * Method
export interface IShipmentMethodReqData {
  _id?: string;
  data?: IShipmentMethod;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}
