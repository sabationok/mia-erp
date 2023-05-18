import { ICategory } from '../categories/categories.types';
import { ICount } from '../counts/counts.types';
import { IBase } from '../global.types';
import { IContractor } from '../contractors/contractors.types';
import { IActivity } from '../companyActivities/activities.types';


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

export type TrStatus = 'rejected' | 'approved' | 'pending';

export interface ITransaction extends IBase {
  amount: number;
  type: TransactionType;
  transactionDate: Date | string;
  currency?: CurrencyCode;
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
  status?: TrStatus;
  comment?: string;
  tags?: string[];
}

export interface ITransactionForReq {
  transactionDate?: Date | string;
  amount?: number;
  type?: TransactionType;
  currency?: CurrencyCode;
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
  status?: TrStatus;
  comment?: string;
  tags?: string[];
}

export interface ITransactionReqData {
  _id?: string;
  data: Partial<ITransactionForReq>;
}
