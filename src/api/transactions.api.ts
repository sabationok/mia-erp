import baseApi from './baseApi';
import {
  IAllTransactionsRes,
  ICreateTransactionRes,
  ITransactionReqData,
  ITransactionRes,
} from 'redux/transactions/transactions.types';
import { FilterReturnDataType } from '../components/Filter/AppFilter';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ISortParams } from './index';

export default class TransactionsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.transactions;

  public static async getAll(
    params?: {
      filter?: FilterReturnDataType;
    } & ISortParams
  ): Promise<IAllTransactionsRes> {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  }

  public static async create(data?: ITransactionReqData['data']): Promise<ICreateTransactionRes> {
    return this.api.post(this.endpoints.create(), data);
  }

  public static async editById(data?: Required<ITransactionReqData>): Promise<ITransactionRes> {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  }

  public static async getById(id?: string): Promise<ITransactionRes> {
    return this.api.get(this.endpoints.getById(id));
  }

  public static async deleteById(id?: string): Promise<ITransactionRes> {
    return this.api.delete(this.endpoints.deleteById(id));
  }
}
