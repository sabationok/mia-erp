import {
  IAllTransactionsRes,
  ICreateTransactionRes,
  ITransactionReqData,
  ITransactionRes,
} from 'types/finances/transactions.types';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { AppResponse } from '../redux/app-redux.types';
import { BankAccountReqData, IBankAccount } from '../types/finances/bank-accounts.types';
import { ClientApi } from './client.api';

export default class TransactionsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.finTransactions;

  public static getAll = (params?: AppQueryParams): Promise<IAllTransactionsRes> => {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  };

  public static create = (data?: ITransactionReqData): Promise<ICreateTransactionRes> => {
    return this.api.post(this.endpoints.create(), data?.data);
  };

  public static updateById = (data?: ITransactionReqData): Promise<ITransactionRes> => {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  };

  public static getById = (id?: string): Promise<ITransactionRes> => {
    return this.api.get(this.endpoints.getById(id));
  };

  public static deleteById = (id?: string): Promise<ITransactionRes> => {
    return this.api.delete(this.endpoints.deleteById(id));
  };
}
export class BankAccountsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.finTransactions.bankAccounts;
  public static create = (reqData?: BankAccountReqData): Promise<AppResponse<IBankAccount>> => {
    return this.api.post(this.endpoints.create(), reqData?.data, { params: reqData?.params });
  };

  public static update = (reqData?: BankAccountReqData): Promise<AppResponse<IBankAccount>> => {
    return this.api.patch(this.endpoints.update(reqData?.data?._id), reqData?.data);
  };
  public static getAll = (reqData?: { params?: AppQueryParams }): Promise<AppResponse<IBankAccount[]>> => {
    return this.api.get(this.endpoints.getList(), { params: reqData?.params });
  };
}

export class FinanceApi {
  public static readonly accounts: any;
  public static readonly bankAccounts = BankAccountsApi;
  public static readonly transactions = TransactionsApi;
}
