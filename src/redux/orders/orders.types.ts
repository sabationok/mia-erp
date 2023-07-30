import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { CurrencyCode } from '../transactions/transactions.types';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { ApiDirType } from '../APP_CONFIGS';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IManager } from '../auth/auth.types';
import { ICompany } from '../companies/companies.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';

export type OrderStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export enum OrderTypeEnum {
  SIMPLE = 'SIMPLE',
  SET = 'SET',
}

export type OrderType = keyof typeof OrderTypeEnum;

export type OrderFilterOption = FilterOpt<OrderType>;

export enum OrderPriceTypeEnum {
  DEFAULT = 'DEFAULT',
  COMMISSION = 'COMMISSION',
  COMMISSION_FIX = 'COMMISSION_FIX',
}

export type OrderPriceType = 'COMMISSION' | 'DEFAULT' | 'COMMISSION_FIX';

export interface IOrderBase extends IBase {
  price?: number;
  priceType?: OrderPriceType;
  type?: OrderType;
  currency?: CurrencyCode;
  status?: OrderStatus;
  archived?: boolean;
  visible?: boolean;
  description?: string;
  tags?: string[];
  isService?: boolean;
}

export interface IOrderSlot extends IPriceListItem {
  origin?: IPriceListItem;
}

export interface IOrderInvoice extends IBase {
  order?: IOrder;
  payments?: IOrderPayment[];
  payer?: IBaseDirItem<any, ApiDirType.CONTRACTORS>;
  bankInfo?: any;
}

export interface IOrderShipment extends IBase {
  customer?: IBaseDirItem<any, ApiDirType.CONTRACTORS>;
  receiver?: IBaseDirItem<any, ApiDirType.CONTRACTORS>;
}

export interface IOrderPayment extends IBase {
  invoice: IOrderInvoice;
}

export interface IDestination extends Partial<IBase> {
  postCode?: string;
  region?: string;
  city?: string;
  street?: string;
  house?: string;
  room?: string;
}

export interface ITransporter extends IBaseDirItem {}

export interface IOrder extends IOrderBase {
  owner?: ICompany;
  author?: IManager;
  editor?: IManager;
  manager?: IManager;

  // customer?: IBaseDirItem<any, ApiDirType.CONTRACTORS>;
  // receiver?: IBaseDirItem<any, ApiDirType.CONTRACTORS>;

  customer?: string;
  receiver?: string;

  destination?: IDestination;
  transporter?: ITransporter;

  slots?: IOrderSlot[];
  invoices?: IOrderInvoice[];
  shipments?: IOrderShipment[];

  comment?: string;
  innerComment?: string;
}

export type OrderImage = { img_preview?: string; img_1x: string; img_2x: string; webp: string };

export interface IOrderForReq extends Partial<Record<keyof IOrder, any>> {
  type?: OrderType;
  customer?: OnlyUUID;
  receiver?: OnlyUUID;
  slots?: OnlyUUID;
  invoices?: OnlyUUID;
  payments?: OnlyUUID;
  shipments?: OnlyUUID;
  comment?: string;
  innerComment?: string;
  status?: OrderStatus;
  tags?: string[];
}

export interface IOrderReqData {
  _id?: string;
  data: IOrderForReq;
}

export interface IOrderReqData {
  _id?: string;
  data: IOrderForReq;
}

export interface IAllOrdersRes extends AppResponse<IOrder[]> {}

export interface IOrderRes extends AppResponse<IOrder> {}

export interface ICreateOrderRes extends AppResponse<IOrder> {}
