import { baseApi } from './index';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import {
  IPermission,
  IPermissionForReq,
  IPermissionReqData,
  PermissionStatus,
} from '../redux/permissions/permissions.types';
import { AppResponse } from '../redux/global.types';

export default class PermissionsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.permissions;

  public static create(data: IPermissionForReq): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.create(), data);
  }

  public static deleteById(id: string): Promise<AppResponse<Pick<IPermission, '_id'>>> {
    return this.api.post(this.endpoints.deleteById(id));
  }

  public static getCurrent(id: string): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.getCurrent(id));
  }

  public static updateById({ id, data }: IPermissionReqData): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.updateById(id), data);
  }

  public static rejectById({
    id,
    data,
  }: IPermissionReqData<{
    status: [PermissionStatus.rejected];
  }>): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.updateById(id), data);
  }

  public static acceptById({
    id,
    data,
  }: IPermissionReqData<{
    status: [PermissionStatus.accepted];
  }>): Promise<AppResponse<IPermission>> {
    return this.api.post(this.endpoints.updateById(id), data);
  }
}
