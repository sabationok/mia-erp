import { CompanyEntity, ICompanyDeletingRes, ICompanyReqData, ICompanyUpdatingRes } from '../types/companies.types';
import { ApiResponse } from '../redux/app-redux.types';
import { PermissionEntity } from '../types/permissions.types';
import { ClientApi } from './client.api';

export class CompaniesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.companies;

  public static readonly getById = async ({
    _id,
    params,
  }: {
    _id?: string;
    params?: { fullInfo?: boolean; configs?: boolean };
  } = {}): Promise<ApiResponse<CompanyEntity>> => {
    return this.api.get(this.endpoints.getById(_id), {
      params,
    });
  };

  public static readonly create = async (data?: ICompanyReqData): Promise<ApiResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data);
  };

  public static readonly updateById = async (data?: ICompanyReqData): Promise<ICompanyUpdatingRes> => {
    return this.api.patch(this.endpoints.updateById(data?._id), data?.data);
  };

  public static readonly deleteById = async (id?: string): Promise<ICompanyDeletingRes> => {
    return this.api.post(this.endpoints.deleteById(id));
  };

  // public static async setConfigs(data?: ICompanyConfigsDto): Promise<AppResponse<ICompanyConfigs>> {
  //   return this.api.post(this.endpoints.setConfigs(), data);
  // }
  // public static async getConfigs(): Promise<AppResponse<ICompanyConfigs>> {
  //   return this.api.get(this.endpoints.getConfigs());
  // }
}

export default CompaniesApi;
