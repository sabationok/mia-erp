import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { OfferPriceEntity } from '../../types/price-management/priceManagement.types';
import { ICompany } from '../../types/companies.types';
import { IManager } from '../../types/auth.types';
import { ISupplierDirItem } from '../../types/dir.types';
import { TabOption } from '../../components/atoms/TabSelector';
import { IWarehouse } from '../../types/warehouses.types';
import { ICustomerBase } from '../../types/customers.types';

export type RefundTypeFilterOption = TabOption;

export enum RefundTypeEnum {
  SIMPLE = 'SIMPLE',
  SET = 'SET',
}

export type RefundStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IRefundSlotItem extends OfferPriceEntity {
  slot?: OnlyUUID;
  order?: OnlyUUID;
  owner?: ICompany;
  manager?: IManager;

  origin?: Partial<OfferPriceEntity>;
}

export interface IRefundSlot extends OfferPriceEntity {
  owner: ICompany;
  order?: OnlyUUID;

  origin?: OfferPriceEntity;
  status?: RefundStatus;
  warehouse?: IWarehouse;
  supplier?: ISupplierDirItem;
}

export interface IRefund extends IBase {
  owner: ICompany;
  manager?: IManager;

  barCode?: string;
  code?: string;

  customer?: ICustomerBase;
  receiver?: ICustomerBase;

  status?: RefundStatus;
  payments?: OnlyUUID[];

  slots?: IRefundSlot[];
  destination?: string;

  comment?: string;
  innerComment?: string;
}

export interface IAllRefundsRes extends AppResponse<IRefund[]> {}

export interface IRefundRes extends AppResponse<IRefund> {}

export interface IRefundReqData {
  _id?: string;
  data: IRefund;
}

export interface IRefundSlotReqData {
  _id?: string;
  data: IRefundSlot;
}

export interface IRefundSlotItemReqData {
  _id?: string;
  data: IRefundSlotItem;
}
