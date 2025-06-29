import { ICustomerBase } from '../customers.types';
import { ApiQueryParams, ApiRequestConfig } from '../../api';
import { ICommunicationMethod } from '../integrations.types';
import {
  HasBarCode,
  HasDescription,
  HasEmbeddedReference,
  HasManager,
  HasOwnerAsCompany,
  HasStatus,
  HasSummary,
  IBase,
  MaybeNull,
  OnlyUUID,
} from '../utils.types';
import { InvoiceEntity } from '../invoices.types';
import { HasDeliveriesList } from '../deliveries.types';
import { IPayment } from '../payments.types';
import { ICreateOrderInfoDto } from './createOrderInfo.dto';
import { ICreateOrderInfoFormState } from './createOrderInfoFormState.type';
import { IOrderTempSlot, OrderSlotDto, OrderSlotEntity } from './order-slot.types';
import { HasRefundRequests } from '../refunds';
import { OrderSummary } from './order-summary.types';
import { HasOrderSchedule } from './order-schedule-fields.types';

export * from './createOrderInfo.dto';
export * from './createOrderInfoFormState.type';

export enum OrderTypeEnum {
  order = 'order',
  group = 'group',
  cCart = 'cart',
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
export type HasOrderSummary = HasSummary<OrderSummary>;
export interface OrderEntity
  extends IBase,
    HasOwnerAsCompany,
    HasManager,
    HasEmbeddedReference,
    HasStatus<OrderStatusEnum>,
    HasOrderSummary,
    HasBarCode,
    HasOrderSchedule,
    HasDescription,
    HasDeliveriesList,
    HasRefundRequests {
  chat?: OnlyUUID;
  group?: OrderEntity;
  orders?: OrderEntity[];

  strategy?: MaybeNull<string>;
  number?: MaybeNull<number>;

  receiver?: ICustomerBase;
  customer?: ICustomerBase;

  code?: MaybeNull<string>;

  communication?: {
    customer?: ICommunicationMethod;
    receiver?: ICommunicationMethod;
  };

  slots?: OrderSlotEntity[];
  invoices?: InvoiceEntity[];
  payments?: IPayment[];
}

export interface ICreateOrdersGroupFormState {
  slots?: IOrderTempSlot[];
  info?: ICreateOrderInfoFormState;
}

export interface IOrderReqData {
  _id?: string;
  data: ICreateOrderInfoDto;
  params?: ApiQueryParams;
}
export interface CreateOrderDto {
  slots?: OrderSlotDto[];
  info?: ICreateOrderInfoDto;
}
export interface UpdateOrderDto extends OnlyUUID, ICreateOrderInfoDto {
  slots?: OrderSlotDto[];
  info?: ICreateOrderInfoDto;
}

export type CreateOrderApiReqConfig = ApiRequestConfig<ICreateOrderInfoDto, ApiQueryParams>;
export type UpdateOrderApiReqConfig = ApiRequestConfig<UpdateOrderDto, ApiQueryParams>;
