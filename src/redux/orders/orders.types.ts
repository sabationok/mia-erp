import { AddressDto, AppResponse, IBase, IFormDataValueWithUUID, OnlyUUID } from '../global.types';
import { IPriceBase, IPriceListItem } from '../priceManagement/priceManagement.types';
import { ICompany } from '../companies/companies.types';
import { IManager, IUserBase } from '../auth/auth.types';
import { IProductInventory, IWarehouse } from '../warehouses/warehouses.types';
import { IProduct } from '../products/products.types';
import { IVariation } from '../products/variations.types';
import { ICustomerBase } from '../customers/customers.types';
import { IShipment } from '../shipments/shipments.types';
import { IPayment } from '../payments/payments.types';
import { IInvoice } from '../invoices/invoices.types';
import { AppQueryParams } from '../../api';
import { ICommunicationMethod } from '../integrations/integrations.types';

export enum OrderTypeEnum {
  Order = 'Order',
  Group = 'Group',
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

export interface IOrderSlotBase extends IPriceBase {
  quantity?: number;
  total?: number;
  status?: OrderStatusEnum;

  product?: IProduct;
  variation?: IVariation;
  origin?: IPriceListItem;
  inventory?: IProductInventory;
  warehouse?: IWarehouse;
}

export interface IOrderSlot extends IBase, IOrderSlotBase {
  owner?: ICompany;
  order?: OnlyUUID;

  shipment?: IShipment;
}

export interface IOrderSlotDto {
  quantity?: number;

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

export interface IOrder extends IBase {
  owner?: ICompany;
  manager?: IManager;
  barCode?: string;
  code?: string;

  externalRef?: string;

  customer?: ICustomerBase;
  receiver?: ICustomerBase;

  communication?: {
    customer?: ICommunicationMethod[];
    receiver?: ICommunicationMethod[];
  };

  executeAt?: string | number | Date;
  executeNow?: boolean;
  status?: OrderStatusEnum;
  totals?: OrderTotals;
  slots?: IOrderSlot[];
  invoices?: IInvoice[];
  shipments?: IShipment[];
  deliveries?: IShipment[];
  payments?: IPayment[];
}

export interface FormDataLocationRef {
  ref: string;
  label: string;
}

export type FormDataLocationRefs = Record<keyof LocationRefsDto, FormDataLocationRef>;

export interface LocationRefsDto {
  country?: string;
  area?: string;
  city?: string;
  street?: string;
}

export interface ICreateOrderInfoFormState {
  manager?: {
    _id: string;
    user?: Partial<IUserBase>;
  };
  customer?: ICustomerBase;
  receiver?: ICustomerBase;
  communication?: {
    customer?: string[];
    receiver?: string[];
  };

  invoiceInfo?: {
    method?: IFormDataValueWithUUID;
    expiredAt?: string | number | Date;
  };
  shipmentInfo?: {
    executeAt?: Date | number | string;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: IFormDataValueWithUUID;
    locationRefs?: FormDataLocationRefs;
    destination?: AddressDto;

    invoiceInfo?: {
      method?: IFormDataValueWithUUID;
      expiredAt?: string | number | Date;
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
    expiredAt?: string | number | Date;
  };
  shipmentInfo?: {
    executeAt?: Date | number | string;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: OnlyUUID;
    locationRefs?: LocationRefsDto;
    destination?: AddressDto;

    invoiceInfo?: {
      method?: OnlyUUID;
      expiredAt?: string | number | Date;
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
    expiredAt?: string | number | Date;
  };
  executeAt?: string | number | Date;
  executeNow?: boolean;
  shipmentInfo?: {
    executeAt?: string | number | Date;
    executeNow?: boolean;
  };
  deliveryInfo?: {
    method?: OnlyUUID;
    destination?: AddressDto | string;

    invoiceInfo?: {
      method?: OnlyUUID;
      expiredAt?: string | number | Date;
    };
  };
}
