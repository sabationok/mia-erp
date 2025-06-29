import { AddressDto, IBase, IFormDataValueWithID, OnlyUUID } from '../app-redux.types';
import { IOrderSlot, OrderEntity } from '../../types/orders/orders.types';
import { IPayment } from '../../types/payments.types';
import { InvoiceEntity } from '../../types/invoices.types';
import { DeliveryEntity } from '../../types/deliveries.types';
import { HasDimensions } from '../../types/utils.types';

export enum ShipmentProviderEnum {
  ukrposhta = 'ukrposhta',
  novaposhta = 'novaposhta',
}
enum ShipmentStatusTypeEnum {}

export interface IShipment extends IBase {
  order?: OrderEntity;
  slots?: IOrderSlot[];

  payment?: IPayment;
  invoice?: InvoiceEntity;

  status?: ShipmentStatusTypeEnum;
  description?: string;

  deliveries?: DeliveryEntity[];
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
export interface IShipmentDto extends IShipmentBaseDto, HasDimensions {
  payment?: OnlyUUID;
  invoice?: OnlyUUID;
  ttn?: string;

  destination?: AddressDto;
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

  provider?: IFormDataValueWithID;
  method?: IFormDataValueWithID;

  destination?: AddressDto;

  description?: string;
}
export interface IShipmentFormData extends IShipmentBaseFormData {
  // order?: IFormDataValueWithID;
  // slots?: string[];
  // payment?: IFormDataValueWithID;
  // invoice?: IFormDataValueWithID;
  // status?: ShipmentStatusTypeEnum;
  // paymentMethod?: IFormDataValueWithID;
  // shipmentInvoice?: IFormDataValueWithID;
  // shipmentPayment?: IFormDataValueWithID;
}
