export interface IBase {
  _id: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type TransactionType = 'EXPENSE' | 'TRANSFER' | 'INCOME';
export type TrCountType = 'ACTIVE' | 'PASSIVE';
export type CurrencyCode = 'UAH';
export interface TrCount extends IBase {
  name?: string;
  label?: string;
  balance?: number;
  type?: TrCountType;
  code?: number | string;
  descr?: string;
  def?: string;
  owner?: string;
}
export interface ITrCategory extends IBase {
  name?: string;
  label?: string;
  type: TransactionType;
  descr?: string;
  def?: string;
  owner?: string;
}
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
export interface ITransaction extends IBase {
  amount: number;
  type: TransactionType;
  transactionDate?: Date | string;
  currency?: CurrencyCode;
  countIn?: TrCount;
  subCountIn?: TrCount;
  countOut?: TrCount;
  subCountOut?: TrCount;
  category?: ITrCategory;
  subCategory?: ITrCategory;
  contractor?: IContractor;
  project?: IProject;
  document?: IDocument;
  companyActivity?: ICompanyActivity;
  status?: 'rejected' | 'approved' | 'pending';
  commnet?: string;
  tags: string[];
}
