import baseApi from './baseApi';
import { FilterReturnDataType } from '../components/Filter/AppFilter';
import { ICompanyReqData, ICompanyRes, IGetAllCompaniesRes } from '../redux/companies/companies.types';
import APP_CONFIGS from 'redux/APP_CONFIGS';

export default class CompaniesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.companies;

  public static async getAllByOwnerId(
    id: string,
    filterData?: FilterReturnDataType,
    sortData?: any
  ): Promise<IGetAllCompaniesRes> {
    return this.api.get(this.endpoints.getAllByOwnerId(id));
  }

  public static async create(data: ICompanyReqData['data']): Promise<ICompanyRes> {
    return this.api.post(this.endpoints.create(), data);
  }

  public static async editById({ data, id, _id }: Required<ICompanyReqData>): Promise<ICompanyRes> {
    return this.api.post(this.endpoints.updateById(_id || id), data);
  }

  public static async getById(id: string): Promise<ICompanyRes> {
    return this.api.post(this.endpoints.getById(id));
  }
}
