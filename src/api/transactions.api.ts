import {
  IAllTransactionsRes,
  ICreateTransactionRes,
  ITransactionReqData,
  ITransactionRes,
} from 'types/finances/transactions.types';
import { ApiAxiosResponse, ApiQueryParams } from './api.types';
import { BankAccountEntity, BankAccountReqData } from '../types/finances/bank-accounts.types';
import { ClientApi } from './client.api';

export default class TransactionsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.finances;

  public static getAll = (params?: ApiQueryParams): Promise<IAllTransactionsRes> => {
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
  private static endpoints = ClientApi._endpoints.finances.bankAccounts;
  public static create = (config?: BankAccountReqData): Promise<ApiAxiosResponse<BankAccountEntity>> => {
    return this.api.post(this.endpoints.create(), config?.data, config);
  };

  public static update = (config?: BankAccountReqData): Promise<ApiAxiosResponse<BankAccountEntity>> => {
    return this.api.patch(this.endpoints.update(), config?.data);
  };
  public static getAll = (config?: { params?: ApiQueryParams }): Promise<ApiAxiosResponse<BankAccountEntity[]>> => {
    return this.api.get(this.endpoints.getAll(), config);
  };
}

export class FinanceApi {
  public static readonly accounts: any;
  public static readonly bankAccounts = BankAccountsApi;
  public static readonly transactions = TransactionsApi;
}
