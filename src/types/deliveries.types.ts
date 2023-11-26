import { AddressDto, IBase, OnlyUUID } from '../redux/global.types';
import { IDeliveryMethod } from './integrations.types';
import {
  HasCompany,
  HasDescription,
  HasDestination,
  HasDestinationRefs,
  HasDimensions,
  HasLabel,
  HasMethod,
  HasStatus,
  MaybeNull,
} from './utils.types';

import { IInvoice } from './invoices.types';
import { IOrder } from './orders.types';
import { ICustomerBase } from './customers.types';

export enum DeliveryStatusTypeEnum {
  pending = 'pending',
}

export interface IDelivery
  extends HasCompany,
    HasDescription,
    HasDimensions,
    HasDestination,
    HasStatus<DeliveryStatusTypeEnum>,
    HasDestinationRefs,
    HasMethod<IDeliveryMethod> {
  ttn?: MaybeNull<string>;
  declaredAmount?: MaybeNull<number>;

  contentTotals?: MaybeNull<IDeliveryContentTotals>;

  customer?: ICustomerBase;
  receiver?: ICustomerBase;

  order?: IOrder;
  invoice?: IInvoice;
}
export interface IDeliveryContentTotals {
  amount?: MaybeNull<number>;
  quantity?: MaybeNull<number>;
}

interface IDeliverySlot extends IBase, HasLabel, HasDimensions {}

export interface IDeliveryBaseDto {
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
}

export interface HasDelivery {
  delivery?: MaybeNull<IDelivery>;
}
export interface HasDeliveriesList {
  deliveries?: MaybeNull<IDelivery[]>;
}
