import { ICategory } from './categories.types';
import { ICount } from './counts.types';
import { IBase } from './global.types';
import { IContractor } from './contractors.types';
import { ICompanyActivity } from './companyActivities.types';

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
  companyActivity?: ICompanyActivity;
  status?: TrStatus;
  comment?: string;
  tags?: string[];
}
