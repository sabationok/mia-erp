import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ApiResponse } from '../redux/app-redux.types';
import { ModuleWithActions } from '../redux/customRoles/customRoles.types';
import { ClientApi } from './client.api';

export default class CustomRolesApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.customRoles;

  public static getAllActions(): Promise<ApiResponse<ModuleWithActions[]>> {
    return this.api.get(this.endpoints.getAllActions());
  }
}
