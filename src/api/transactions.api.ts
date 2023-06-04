import baseApi from './baseApi';
import { IAllTransactionsRes, ICreateTransactionRes, ITransactionReqData } from 'redux/transactions/transactions.types';
import { FilterReturnDataType } from '../components/Filter/AppFilter';

export const TRANSACTIONS_API_BASENAME = '/transactions';
export const transactionsApiEndpoints = {
  getAll: (): string => `${TRANSACTIONS_API_BASENAME}/getAll`,
  create: (): string => `${TRANSACTIONS_API_BASENAME}/create`,
  deleteById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/delete/${id}`,
  editById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/update/${id}`,
};

export default class TransactionsApi {
  private static api = baseApi;

  public static async getAll(filterData?: FilterReturnDataType, sortData?: any): Promise<IAllTransactionsRes> {
    return this.api.get(transactionsApiEndpoints.getAll());
  }

  public static async create(data: ITransactionReqData['data']): Promise<ICreateTransactionRes> {
    return this.api.post(transactionsApiEndpoints.create(), data);
  }

  public static async editById(id: string, data: Partial<ITransactionReqData>): Promise<ICreateTransactionRes> {
    return this.api.post(transactionsApiEndpoints.editById(id), data);
  }
}
