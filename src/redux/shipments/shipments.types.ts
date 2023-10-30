import { AddressDto, IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { IOrder, IOrderSlot } from '../orders/orders.types';
import { IPayment, IPaymentMethod } from '../payments/payments.types';
import { IInvoice } from '../invoices/invoices.types';
import { AppQueryParams } from '../../api';
import { IProductDimensions } from '../products/products.types';
import { IShipmentMethod } from '../integrations/integrations.types';

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
  price?: number;
  returnAmount?: number;
  commissionAmount?: number;
  ttn?: string;

  provider?: IFormDataValueWithUUID;
  method?: IFormDataValueWithUUID;

  destination?: AddressDto;

  description?: string;
}
export interface IShipmentFormData extends IShipmentBaseFormData {
  order?: IFormDataValueWithUUID;
  slots?: string[];

  payment?: IFormDataValueWithUUID;
  invoice?: IFormDataValueWithUUID;

  dimensions?: IProductDimensions;
  status?: ShipmentStatusTypeEnum;

  paymentMethod?: IFormDataValueWithUUID;
  shipmentInvoice?: IFormDataValueWithUUID;
  shipmentPayment?: IFormDataValueWithUUID;
}

export interface IShipmentServiceFormData {
  order?: OnlyUUID;
  slots?: string[];
  ttn?: string;
  price?: number;

  destination?: AddressDto; // TODO refactoring

  dimensions?: IProductDimensions;

  paymentMethod?: IFormDataValueWithUUID;
}

// * Method
export interface IShipmentMethodReqData {
  _id?: string;
  data?: IShipmentMethod;
  params?: Pick<AppQueryParams, 'disabled' | 'isDefault'>;
}
