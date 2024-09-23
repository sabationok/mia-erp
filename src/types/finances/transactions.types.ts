import { ApiAxiosResponse, IBase } from '../../redux/app-redux.types';
import { IContractor } from '../../redux/directories/contractors.types';
import { IActivity } from '../../redux/directories/activities.types';
import { ICount } from '../../redux/directories/counts.types';
import { FinCategoryEntity } from '../directories.types';

export enum CurrencyCode {
  UAH = 'UAH',
  EUR = 'EUR',
  USD = 'USD',
}
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
  category?: FinCategoryEntity;
  subCategory?: FinCategoryEntity;
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

export interface IAllTransactionsRes extends ApiAxiosResponse<ITransaction[]> {}

export interface ITransactionRes extends ApiAxiosResponse<ITransaction> {}

export interface ICreateTransactionRes extends ApiAxiosResponse<ITransaction> {}
