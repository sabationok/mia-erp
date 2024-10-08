import { ApiAxiosResponse } from '../redux/app-redux.types';
import { ModuleWithActions } from '../redux/customRoles/customRoles.types';
import { ClientApi } from './client.api';

export default class CustomRolesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.customRoles;

  public static getAllActions(): Promise<ApiAxiosResponse<ModuleWithActions[]>> {
    return this.api.get(this.endpoints.getAllActions());
  }
}
