import {
  ApiAxiosResponse,
  AppDate,
  HasAmount,
  HasCurrencyCode,
  HasStatus,
  HasType,
  IBase,
  Keys,
} from '../../redux/app-redux.types';
import { IContractor } from '../../redux/directories/contractors.types';
import { IActivity } from '../../redux/directories/activities.types';
import { FinAccountEntity } from './fin-accounts.types';
import { FinCategoryEntity } from '../directories.types';

export enum FinTransactionTypeEnum {
  INCOME = 'INCOME',
  TRANSFER = 'TRANSFER',
  EXPENSE = 'EXPENSE',
}

export enum CurrencyCode {
  UAH = 'UAH',
  EUR = 'EUR',
  USD = 'USD',
}
export type TransactionType = Keys<typeof FinTransactionTypeEnum>;

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

export interface ITransaction extends ITransactionBase, HasCurrencyCode {
  eventDate?: AppDate;
  countIn?: FinAccountEntity;
  subCountIn?: FinAccountEntity;
  countOut?: FinAccountEntity;
  subCountOut?: FinAccountEntity;
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

export interface ITransactionBase
  extends IBase,
    HasCurrencyCode,
    HasStatus<TrStatus>,
    HasType<TransactionType>,
    HasAmount {}

export interface ITransactionForReq extends Partial<ITransaction> {}

export interface ITransactionReqData {
  _id?: string;
  data: ITransactionForReq;
}

export interface IAllTransactionsRes extends ApiAxiosResponse<ITransaction[]> {}

export interface ITransactionRes extends ApiAxiosResponse<ITransaction> {}

export interface ICreateTransactionRes extends ApiAxiosResponse<ITransaction> {}
