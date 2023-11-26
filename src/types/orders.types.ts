import { AddressDto, AppResponse, IBase, IFormDataValueWithID, MagicLinkRef, OnlyUUID } from '../redux/global.types';
import { IPriceBase, IPriceListItem } from './priceManagement.types';
import { IUserBase } from './auth.types';
import { ICustomerBase } from './customers.types';
import { AppQueryParams } from '../api';
import { ICommunicationMethod } from './integrations.types';
import {
  AppDate,
  FormDataLocationRefs,
  HasExtRef,
  HasMagicLink,
  HasManager,
  HasOwnerAsCompany,
  HasQuantity,
  HasStatus,
  HasTotal,
  LocationRefsDto,
  MaybeNull,
} from './utils.types';
import { IProduct } from './products.types';
import { IProductInventory, IWarehouse } from './warehouses.types';
import { IInvoice } from './invoices.types';
import { IDelivery } from './deliveries.types';
import { IPayment } from './payments.types';
import { IVariation } from './variations.types';

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
export interface IOrdersGroup extends IBase, HasMagicLink {
  orders?: IOrder[];
}

export interface IOrder
  extends IBase,
    HasOwnerAsCompany,
    MagicLinkRef,
    HasManager,
    HasExtRef,
    HasStatus<OrderStatusEnum> {
  group?: IOrdersGroup;

  receiver?: ICustomerBase;
  customer?: ICustomerBase;

  barCode?: string;
  code?: string;

  communication?: {
    customer?: ICommunicationMethod[];
    receiver?: ICommunicationMethod[];
  };

  total?: OrderTotals;
  executeAt?: AppDate;
  executeNow?: boolean;

  payments?: IPayment[];
  invoices?: IInvoice[];
  deliveries?: IDelivery[];

  slots?: IOrderSlot[];
}

export interface ICreateOrderInfoFormState {
  customer?: ICustomerBase;
  receiver?: ICustomerBase;

  manager?: {
    _id: string;
    user?: Partial<IUserBase>;
  };

  communication?: {
    customer?: string[];
    receiver?: string[];
  };

  invoiceInfo?: {
    method?: IFormDataValueWithID;
    expiredAt?: AppDate;
  };

  executeAt?: AppDate;
  executeNow?: boolean;

  shipmentInfo?: {
    executeAt?: AppDate;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: IFormDataValueWithID;
    destinationRefs?: FormDataLocationRefs;
    destination?: AddressDto;

    invoiceInfo?: {
      method?: IFormDataValueWithID;
      expiredAt?: AppDate;
    };
  };
}

export interface ICreateOrdersGroupFormState {
  slots: IOrderTempSlot[];
  info?: ICreateOrderInfoFormState;

  orders: IOrder[];
}

export interface IAllOrdersRes extends AppResponse<IOrder[]> {}

export interface IOrderRes extends AppResponse<IOrder> {}

export interface IOrderReqData {
  _id?: string;
  data: IOrderBaseDto;
  params?: AppQueryParams;
}

export interface ICreateOrderInfoDto {
  manager?: OnlyUUID;
  customer?: OnlyUUID;
  receiver?: OnlyUUID;
  communication?: {
    customer?: string[];
    receiver?: string[];
  };

  invoiceInfo?: {
    method?: OnlyUUID;
    expiredAt?: AppDate;
  };
  shipmentInfo?: {
    executeAt?: AppDate;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: OnlyUUID;
    locationRefs?: LocationRefsDto;
    destination?: AddressDto;

    invoiceInfo?: {
      method?: OnlyUUID;
      expiredAt?: AppDate;
    };
  };
}

export interface ICreateOrdersGroupDto {
  slots?: IOrderSlotDto[];
  info?: ICreateOrderInfoDto;
}

export interface ICreateOrdersWithSlotsAndGroupByWarehousesReqData {
  data: ICreateOrdersGroupDto;
  params?: AppQueryParams;
}

export interface IOrderBaseDto {
  manager?: OnlyUUID;
  customer?: ICustomerBase | OnlyUUID;
  receiver?: ICustomerBase | OnlyUUID;
  communication?: {
    customer?: string[];
    receiver?: string[];
  };
  status?: OrderStatusEnum;
  invoiceInfo?: {
    method?: OnlyUUID;
    expiredAt?: AppDate;
  };
  executeAt?: AppDate;
  executeNow?: boolean;
  shipmentInfo?: {
    executeAt?: AppDate;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: OnlyUUID;
    destination?: AddressDto | string;

    invoiceInfo?: {
      method?: OnlyUUID;
      expiredAt?: AppDate;
    };
  };
}
