import baseApi from './baseApi';
import {
  IAllTransactionsRes,
  ICreateTransactionRes,
  ITransactionReqData,
  ITransactionRes,
} from 'redux/transactions/transactions.types';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';

export default class TransactionsApi {
  private static api = baseApi;
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
}
