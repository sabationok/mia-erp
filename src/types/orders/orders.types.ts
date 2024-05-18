import { AppResponse } from '../../redux/global.types';
import { IPriceBase, OfferPriceEntity } from '../price-management/priceManagement.types';
import { ICustomerBase } from '../customers.types';
import { AppQueryParams } from '../../api';
import { ICommunicationMethod } from '../integrations.types';
import {
  CurrencyCode,
  HasEmbeddedReference,
  HasEmbeddedReferences,
  HasExecuteDate,
  HasExpireDate,
  HasManager,
  HasOwnerAsCompany,
  HasQuantity,
  HasStatus,
  HasSummary,
  HasTotal,
  IBase,
  MaybeNull,
  OnlyUUID,
} from '../utils.types';
import { OfferEntity } from '../offers/offers.types';
import { IWarehouse, WarehouseItemEntity } from '../warehouses.types';
import { IInvoice } from '../invoices.types';
import { IDelivery } from '../deliveries.types';
import { IPayment } from '../payments.types';
import { VariationEntity } from '../offers/variations.types';
import { ICreateOrderInfoDto } from './createOrderInfo.dto';
import { ICreateOrderInfoFormState } from './createOrderInfoFormState.type';

export * from './createOrderInfo.dto';
export * from './createOrderInfoFormState.type';

export enum OrderTypeEnum {
  Order = 'Order',
  Group = 'Group',
}

export interface HasOrdersGroup {
  group?: MaybeNull<IOrdersGroup>;
}

export interface HasOrder {
  order?: MaybeNull<OrderEntity>;
}

export interface HasOrdersList {
  orders?: MaybeNull<OrderEntity[]>;
}
export enum OrderStatusEnum {
  new = 'order_new',
  inWork = 'order_inWork',
  rejectedByCustomer = 'order_rejectedByCustomer',
  rejectedByManager = 'order_rejectedByManager',
  active = 'order_active',
  fulfilled = 'order_fulfilled',
  fulfilledWithRefund = 'order_fulfilledWithRefund',
  archived = 'order_archived',
  expired = 'order_expired',
}

// export type OrderStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IOrderSlotBase extends IPriceBase, HasStatus<OrderStatusEnum>, HasQuantity, HasTotal {
  order?: OnlyUUID;
  delivery?: OnlyUUID;
  invoice?: OnlyUUID;

  product?: OfferEntity;
  warehouse?: IWarehouse;
  origin?: OfferPriceEntity;
  inventory?: WarehouseItemEntity;
  variation?: VariationEntity;

  imgPreview?: string;

  fromRef?: string;

  discounts?: OfferPriceEntity['discounts'];
}

export interface IOrderSlot extends IBase, IOrderSlotBase, HasOwnerAsCompany {}

export interface IOrderSlotDto extends HasQuantity {
  product?: OnlyUUID;
  variation?: OnlyUUID;
  origin?: OnlyUUID;
  inventory?: OnlyUUID;
  warehouse?: OnlyUUID;
}

export interface IOrderTempSlot extends IOrderSlotBase {
  tempId?: string;
}

export interface OrderSummaryInfo {
  items: number;
  amount: number;
  bonus: number;
  discount: number;
  cashback: number;
  received: number;
  discounts: any[];
  bonuses: any[];
  taxes: any[];
  currency: CurrencyCode;
}

export interface OrderTotals {
  items?: number;
  amount?: number;
}

export interface IOrdersGroup extends Omit<OrderEntity, 'group'> {
  orders?: MaybeNull<OrderEntity[]>;
  strategy?: MaybeNull<string>;
}

export interface OrderEntity
  extends IBase,
    HasOwnerAsCompany,
    HasManager,
    HasExpireDate,
    HasEmbeddedReference,
    HasExecuteDate,
    HasStatus<OrderStatusEnum>,
    HasSummary<OrderSummaryInfo>,
    HasEmbeddedReferences<string, string> {
  group?: MaybeNull<IOrdersGroup>;

  number?: MaybeNull<number>;

  receiver?: MaybeNull<ICustomerBase>;
  customer?: MaybeNull<ICustomerBase>;

  barCode?: MaybeNull<string>;
  code?: MaybeNull<string>;

  communication?: {
    customer?: MaybeNull<ICommunicationMethod>;
    receiver?: MaybeNull<ICommunicationMethod>;
  };

  total?: MaybeNull<OrderTotals>;

  slots?: IOrderSlot[];
  invoices?: IInvoice[];
  payments?: IPayment[];
  deliveries?: IDelivery[];
}

export interface ICreateOrdersGroupFormState {
  slots: IOrderTempSlot[];
  info?: ICreateOrderInfoFormState;

  orders: OrderEntity[];
}

export interface IAllOrdersRes extends AppResponse<OrderEntity[]> {}

export interface IOrderRes extends AppResponse<OrderEntity> {}

export interface IOrderReqData {
  _id?: string;
  data: ICreateOrderInfoDto;
  params?: AppQueryParams;
}

export interface ICreateOrdersGroupDto {
  slots?: IOrderSlotDto[];
  info?: ICreateOrderInfoDto;
}

export interface ICreateOrdersWithSlotsAndGroupByWarehousesReqData {
  data: ICreateOrdersGroupDto;
  params?: AppQueryParams;
}
