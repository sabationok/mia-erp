// import { AppResponse, IBase, OnlyUUID } from '../global.types';
// import { CurrencyCode } from '../transactions/transactions.types';
// import { IBaseDirItem } from '../../components/Directories/dir.types';
// import { ApiDirType } from '../APP_CONFIGS';
// import { FilterOpt } from '../../components/ModalForm/ModalFilter';
// import { IManager } from '../auth/auth.types';
// import { ICompany } from '../companies/companies.types';
// import { IPriceListItem } from '../priceManagement/priceManagement.types';
//

import { AppResponse, IBase, OnlyUUID } from '../global.types';
import { IPriceListItem } from '../../types/priceManagement.types';
import { ICompany } from '../../types/companies.types';
import { IManager } from '../../types/auth.types';
import { ISupplierDirItem } from '../../types/dir.types';
import { FilterOpt } from '../../components/ModalForm/ModalFilter';
import { IWarehouse } from '../../types/warehouses.types';
import { ICustomerBase } from '../../types/customers.types';

export type RefundTypeFilterOption = FilterOpt;
export enum RefundTypeEnum {
  SIMPLE = 'SIMPLE',
  SET = 'SET',
}
export type RefundStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';
export interface IRefundSlotItem extends IPriceListItem {
  slot?: OnlyUUID;
  order?: OnlyUUID;
  owner?: ICompany;
  manager?: IManager;

  origin?: Partial<IPriceListItem>;
}

export interface IRefundSlot extends IPriceListItem {
  owner: ICompany;
  order?: OnlyUUID;

  origin?: IPriceListItem;
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
