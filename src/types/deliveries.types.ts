import {
  HasCompany,
  HasDescription,
  HasDestination,
  HasDestinationRefs,
  HasDimensions,
  HasMethod,
  HasStatus,
  HasType,
  OnlyUUID,
  UUID,
} from './utils.types';
import { IDeliveryMethod } from './integrations.types';
import { InvoiceEntity } from './invoices.types';
import { OrderEntity } from './orders';
import { ICustomerBase } from './customers.types';
import { HasRefundRequests } from './refunds';
import { PermissionEntity } from './permissions.types';
import { WarehouseEntity } from './warehousing';
import { AddressEntity } from './addresses/addresses.types';
import { IPayment } from './payments.types';
import { AmountAndPercentageFields } from './price-management';

export enum DeliveryStatusTypeEnum {
  pending = 'pending',
  queued = 'queued',
  success = 'success',
  delivered = 'delivered',
  shipped = 'shipped',
  reversed = 'reversed',
}

export enum DeliveryTypeEnum {
  reverse = 'reverse',
  in = 'in',
  out = 'out',
}

export interface DeliverySummaryFields {
  itemsAmount?: string;
  itemsCount?: string;
  cost?: string;
  declared?: string;
  insurance?: string;
}
export interface HasDeliverySummary {
  summary?: DeliverySummaryFields;
}

export interface DeliveryImposedPayment extends IPayment {}
export interface DeliveryEntity
  extends HasCompany,
    HasDescription,
    HasDimensions,
    HasDestination,
    HasType<DeliveryTypeEnum>,
    HasStatus<DeliveryStatusTypeEnum>,
    HasDestinationRefs,
    HasMethod<IDeliveryMethod>,
    HasRefundRequests,
    HasDeliverySummary {
  customer?: ICustomerBase;
  receiver?: ICustomerBase;

  sender?: PermissionEntity;
  _receiver?: PermissionEntity; // TODO

  order?: OrderEntity;
  invoice?: InvoiceEntity;

  imposedPayment?: DeliveryImposedPayment;

  warehouse?: WarehouseEntity;

  from?: AddressEntity;
  to?: AddressEntity;
}

export interface CreateDeliveryDto extends HasDescription, HasDeliverySummary, HasDestination {
  orderId: UUID;
  invoiceId?: UUID;
  methodId?: UUID;
  slotsIds?: UUID[];
  warehouseId?: UUID;
  fromId?: UUID;
  toId?: UUID;

  reference?: string;

  imposedPayment?: AmountAndPercentageFields & {
    methodId?: UUID;
  };
}

export interface UpdateDeliveryDto extends OnlyUUID, CreateDeliveryDto {}

export interface HasDelivery {
  delivery?: DeliveryEntity;
}
export interface HasDeliveriesList {
  deliveries?: DeliveryEntity[];
}
