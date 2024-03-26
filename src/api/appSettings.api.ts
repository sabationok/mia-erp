import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse, RoleActionType } from '../redux/global.types';
import { ClientApi } from './client.api';

export default class AppSettingsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.appSettings;

  public static async getAllActions(): Promise<AppResponse<Record<string, RoleActionType[]>>> {
    return this.api.get(this.endpoints.getAllActions());
  }
}
