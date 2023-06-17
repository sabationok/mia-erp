import { baseApi } from './index';
import APP_CONFIGS, { EndpointNames } from '../redux/APP_CONFIGS';
import {
  IPermission,
  IPermissionForReq,
  IPermissionReqData,
  IPermissionsResData,
  PermissionStatus,
} from '../redux/permissions/permissions.types';
import { AppResponse } from '../redux/global.types';

export default class PermissionsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.permissions;

  public static create(data: IPermissionForReq): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.create(), data);
  }

  public static deleteById<RD = any>(id: string): Promise<AppResponse<{ _id?: string; result: boolean } | RD>> {
    return this.api.post(this.endpoints.deleteById(id));
  }

  public static getCurrent(): Promise<AppResponse<{ permission_token: string } & IPermission>> {
    return this.api.get(this.endpoints.getCurrent());
  }

  public static updateById({ id, data }: IPermissionReqData): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.updateById(id), data);
  }

  public static logIn(id: string): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.logIn(id));
  }

  public static logOut(): Promise<AppResponse<{ _id: string; result: boolean }>> {
    return this.api.post(this.endpoints.logOut());
  }

  public static rejectById({
    id,
    data,
  }: IPermissionReqData<{
    status: [PermissionStatus.REJECTED];
  }>): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.updateById(id), data);
  }

  public static acceptById({
    id,
    data,
  }: IPermissionReqData<{
    status: [PermissionStatus.ACCEPTED];
  }>): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.updateById(id), data);
  }

  public static getAllByUserId(id: string): Promise<IPermissionsResData> {
    return this.api.get(this.endpoints[EndpointNames.getAllByUserId](id));
  }

  public static getAllByCompanyId(id: string): Promise<IPermissionsResData> {
    return this.api.get(this.endpoints[EndpointNames.getAllByCompanyId](id));
  }
}
