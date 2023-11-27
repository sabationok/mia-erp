import { AppResponse, IBase, OnlyUUID } from '../redux/global.types';
import { IPriceBase, IPriceListItem } from './priceManagement.types';
import { HasCustomer, HasReceiver } from './customers.types';
import { AppQueryParams } from '../api';
import { ICommunicationMethod } from './integrations.types';
import {
  HasCompany,
  HasExecuteDate,
  HasExtRef,
  HasMagicLink,
  HasManager,
  HasOwnerAsCompany,
  HasQuantity,
  HasStatus,
  HasTotal,
  MaybeNull,
} from './utils.types';
import { IProduct } from './products.types';
import { IProductInventory, IWarehouse } from './warehouses.types';
import { IInvoice } from './invoices.types';
import { IDelivery } from './deliveries.types';
import { IPayment } from './payments.types';
import { IVariation } from './variations.types';
import { ICreateOrderInfoFormState } from './orders/createOrderInfoFormState.types';
import { ICreateOrderInfoDto } from './orders/createOrderInfoDto.types';

export enum OrderTypeEnum {
  Order = 'Order',
  Group = 'Group',
}

export interface HasOrdersGroup {
  group?: MaybeNull<IOrdersGroup>;
}

export interface HasOrder {
  order?: MaybeNull<IOrder>;
}

export interface HasOrdersList {
  orders?: MaybeNull<IOrder[]>;
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
  product?: IProduct;
  warehouse?: IWarehouse;
  origin?: IPriceListItem;
  inventory?: IProductInventory;
  variation?: IVariation;
}

export interface IOrderSlot extends IBase, IOrderSlotBase, HasOwnerAsCompany {
  delivery?: OnlyUUID;
  invoice?: OnlyUUID;
  order?: OnlyUUID;
}

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

export interface OrderTotals {
  items?: number;
  amount?: number;
}

export interface IOrdersGroup extends IBase, HasMagicLink, HasOrdersList {}

// HasInvoicesList,
// HasDeliveriesList,
// HasOrdersGroup,
// HasPaymentsList,
// HasSlotsList<IOrderSlot>
export type IOrder = IBase &
  HasOwnerAsCompany &
  HasMagicLink &
  HasManager &
  HasExtRef &
  HasExecuteDate &
  HasStatus<OrderStatusEnum> &
  HasCompany &
  HasCustomer &
  HasReceiver & {
    group?: IOrdersGroup;
    payments?: IPayment[];
    slots?: IOrderSlot[];
    deliveries?: IDelivery[];
    invoices?: IInvoice[];

    barCode?: string;
    code?: string;
    communication?: {
      customer?: ICommunicationMethod[];
      receiver?: ICommunicationMethod[];
    };
    total?: OrderTotals;
  };

export interface ICreateOrdersGroupFormState {
  slots: IOrderTempSlot[];
  info?: ICreateOrderInfoFormState;

  orders: IOrder[];
}

export interface IAllOrdersRes extends AppResponse<IOrder[]> {}

export interface IOrderRes extends AppResponse<IOrder> {}

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
