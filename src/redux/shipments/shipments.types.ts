import { AddressDto, IBase, IFormDataValueWithID, OnlyUUID } from '../global.types';
import { IOrder, IOrderSlot } from '../../types/orders/orders.types';
import { IPayment } from '../../types/payments.types';
import { IInvoice } from '../../types/invoices.types';
import { IDelivery } from '../../types/deliveries.types';
import { HasDimensions } from '../../types/utils.types';

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

  status?: ShipmentStatusTypeEnum;
  description?: string;

  deliveries?: IDelivery[];
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
