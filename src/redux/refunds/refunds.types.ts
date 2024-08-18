import { ApiResponse, IBase, OnlyUUID } from '../app-redux.types';
import { PriceEntity } from '../../types/price-management/price-management.types';
import { CompanyEntity } from '../../types/companies.types';
import { IManager } from '../../types/auth/auth.types';
import { SupplierDirEntity } from '../../types/dir.types';
import { TabOption } from '../../components/atoms/TabSelector';
import { WarehouseEntity } from '../../types/warehousing/warehouses.types';
import { ICustomerBase } from '../../types/customers.types';

export type RefundTypeFilterOption = TabOption;

export enum RefundTypeEnum {
  SIMPLE = 'SIMPLE',
  SET = 'SET',
}

export type RefundStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface IRefundSlotItem extends PriceEntity {
  slot?: OnlyUUID;
  order?: OnlyUUID;
  owner?: CompanyEntity;
  manager?: IManager;

  origin?: Partial<PriceEntity>;
}

export interface IRefundSlot extends PriceEntity {
  owner: CompanyEntity;
  order?: OnlyUUID;

  origin?: PriceEntity;
  status?: RefundStatus;
  warehouse?: WarehouseEntity;
  supplier?: SupplierDirEntity;
}

export interface IRefund extends IBase {
  owner: CompanyEntity;
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

export interface IAllRefundsRes extends ApiResponse<IRefund[]> {}

export interface IRefundRes extends ApiResponse<IRefund> {}

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
