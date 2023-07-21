import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse, RoleActionType } from '../redux/global.types';

export default class AppSettingsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.appSettings;

  public static async getAllActions(): Promise<AppResponse<Record<string, RoleActionType[]>>> {
    return this.api.get(this.endpoints.getAllActions());
  }
}
