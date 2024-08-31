import {
  IPermissionForReq,
  IPermissionReqData,
  IPermissionsResData,
  PermissionEntity,
  PermissionRecipientEnum,
  PermissionStatus,
} from '../types/permissions.types';
import { ApiAxiosResponse } from '../redux/app-redux.types';
import { UserEntity } from '../types/auth/auth.types';
import { ClientApi } from './client.api';
import { CompanyQueryType } from '../types/companies/companies.types';

export default class PermissionsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.permissions;

  public static create = (data: IPermissionForReq): Promise<ApiAxiosResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.create(), data);
  };

  public static inviteUser = (data: IPermissionForReq): Promise<ApiAxiosResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.inviteUser(), data);
  };

  public static deleteById = (id: string): Promise<ApiAxiosResponse<{ _id?: string; result: boolean }>> => {
    return this.api.post(this.endpoints.deleteById(id));
  };

  public static getCurrent = (): Promise<ApiAxiosResponse<{ permission_token: string } & PermissionEntity>> => {
    return this.api.get(this.endpoints.getCurrent());
  };

  public static updateById = ({ id, data }: IPermissionReqData): Promise<ApiAxiosResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.updateById(id), data);
  };

  public static logIn = (id: string): Promise<ApiAxiosResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.logIn(id));
  };

  public static logOut = (): Promise<ApiAxiosResponse<{ _id: string; result: boolean; user: UserEntity }>> => {
    return this.api.post(this.endpoints.logOut());
  };

  public static rejectById = ({
    id,
    data,
  }: IPermissionReqData<{
    status: [PermissionStatus.REJECTED];
  }>): Promise<ApiAxiosResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.updateById(id), data);
  };

  public static acceptById = ({
    id,
    data,
  }: IPermissionReqData<{
    status: [PermissionStatus.ACCEPTED];
  }>): Promise<ApiAxiosResponse<PermissionEntity>> => {
    return this.api.post(this.endpoints.updateById(id), data);
  };

  public static getAllByUserId = (params?: {
    userId?: string;
    query?: {
      userId?: string;
      type?: CompanyQueryType;
      recipient?: PermissionRecipientEnum;
      status?: PermissionStatus;
    };
  }): Promise<IPermissionsResData> => {
    return this.api.get(this.endpoints.getAllByUserId(params?.userId), { params: params?.query });
  };

  public static getAllByCompanyId = (data?: {
    _id: string;
    params?: { recipient?: PermissionRecipientEnum };
  }): Promise<IPermissionsResData> => {
    return this.api.get(this.endpoints.getAll(), { params: { ...data?.params, companyId: data?._id } });
  };
}
