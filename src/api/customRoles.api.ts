import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse } from '../redux/global.types';
import { ModuleWithActions } from '../redux/customRoles/customRoles.types';

export default class CustomRolesApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.customRoles;

  public static getAllActions(): Promise<AppResponse<ModuleWithActions[]>> {
    return this.api.get(this.endpoints.getAllActions());
  }
}
