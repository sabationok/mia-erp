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

  public static async getAll(params?: AppQueryParams): Promise<IAllTransactionsRes> {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  }

  public static async create(data?: ITransactionReqData): Promise<ICreateTransactionRes> {
    console.log('api tr create', data);
    return this.api.post(this.endpoints.create(), data?.data);
  }

  public static async updateById(data?: ITransactionReqData): Promise<ITransactionRes> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  }

  public static async getById(id?: string): Promise<ITransactionRes> {
    return this.api.get(this.endpoints.getById(id));
  }

  public static async deleteById(id?: string): Promise<ITransactionRes> {
    return this.api.delete(this.endpoints.deleteById(id));
  }

  public static createBankAccount = async (reqData?: BankAccountReqData): Promise<AppResponse<IBankAccount>> => {
    return this.api.post(this.endpoints.bankAccounts.create(), reqData?.data, { params: reqData?.params });
  };

  public static updateBankAccount = async (reqData?: BankAccountReqData): Promise<AppResponse<IBankAccount>> => {
    return this.api.patch(this.endpoints.bankAccounts.update(reqData?._id), reqData?.data);
  };
  public static getBankAccountsList = async (reqData?: {
    params?: AppQueryParams;
  }): Promise<AppResponse<IBankAccount[]>> => {
    return this.api.get(this.endpoints.bankAccounts.getList(), { params: reqData?.params });
  };
}
