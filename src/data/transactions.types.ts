import { ICategory } from './categories.types';
import { ICount } from './counts.types';

export interface IBase {
  _id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type CurrencyCode = 'UAH';
export type TransactionType = 'EXPENSE' | 'TRANSFER' | 'INCOME';
export interface IContractor extends IBase {
  name?: string;
  label?: string;
  type?: string;
  descr?: string;
  def?: string;
}
export interface ICompanyActivity extends IBase {
  name?: string;
  label?: string;
  type?: string;
  def?: string;
}
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
  companyActivity?: ICompanyActivity;
  status?: TrStatus;
  comment?: string;
  tags?: string[];
}
