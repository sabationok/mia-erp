import { AppResponse, IBase } from '../global.types';
import { IContractor } from '../contractors/contractors.types';
import { IActivity } from '../companyActivities/activities.types';
import { ICount } from '../directories/counts.types';
import { ICategory } from '../directories/directories.types';

export type CurrencyCode = 'UAH';
export type TransactionType = 'EXPENSE' | 'TRANSFER' | 'INCOME';

export interface IProject extends IBase {
  name?: string;
  label?: string;
  type?: string;
  def?: string;
}

export interface IDocument extends IBase {
  name?: string;
  label?: string;
  number?: string;
  type?: string;
}

export type TrStatus = 'rejected' | 'approved' | 'pending' | 'error' | 'success' | 'warning' | 'info';

export interface ITransaction extends ITransactionBase {
  eventDate?: number | string | Date;
  countIn?: ICount;
  subCountIn?: ICount;
  countOut?: ICount;
  subCountOut?: ICount;
  category?: ICategory;
  subCategory?: ICategory;
  contractor?: IContractor;
  project?: IProject;
  document?: IDocument;
  activity?: IActivity;
  // status?: TrStatus;
  comment?: string;
  // tags?: string[];
}

export interface ITransactionBase extends IBase {
  amount?: number;
  type?: TransactionType;
  currency?: CurrencyCode;
  status?: TrStatus;
  tags?: string[];
}

export interface ITransactionForReq extends Partial<Record<keyof ITransaction, any>> {
  eventDate?: number | Date;
  amount?: number;
  type?: TransactionType;
  currency?: CurrencyCode;
  status?: TrStatus;
  tags?: string[];
  countIn?: string;
  subCountIn?: string;
  countOut?: string;
  subCountOut?: string;
  category?: string;
  subCategory?: string;
  contractor?: string;
  project?: string;
  document?: string;
  companyActivity?: string;
  comment?: string;
}

export interface ITransactionReqData {
  _id?: string;
  data: ITransactionForReq;
}

export interface IAllTransactionsRes extends AppResponse<ITransaction[]> {}

export interface ITransactionRes extends AppResponse<ITransaction> {}

export interface ICreateTransactionRes extends AppResponse<ITransaction> {}
