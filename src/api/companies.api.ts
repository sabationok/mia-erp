import { CompanyEntity, ICompanyReqData } from '../types/companies/companies.types';
import { ApiResponse } from './api.types';
import { PermissionEntity } from '../types/permissions.types';
import { ClientApi } from './client.api';

export class CompaniesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.companies;

  public static readonly getOne = (
    _?: undefined,
    params?: { _id?: string; fullInfo?: boolean; configs?: boolean }
  ): Promise<ApiResponse<CompanyEntity>> => {
    return this.api.get(this.endpoints.getOne(), {
      params,
    });
  };

  public static readonly create = (data?: ICompanyReqData): Promise<ApiResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.create(), data?.data);
  };

  public static readonly update = (data?: ICompanyReqData): Promise<ApiResponse<CompanyEntity>> => {
    return this.api.patch(this.endpoints.update(), data?.data);
  };

  public static readonly delete = (_?: undefined, params?: { _id?: string }): Promise<ApiResponse<CompanyEntity>> => {
    return this.api.delete(this.endpoints.delete(), { params });
  };
}

export default CompaniesApi;
