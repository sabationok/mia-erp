import { ApiAxiosResponse, RoleActionType } from '../redux/app-redux.types';
import { ClientApi } from './client.api';

export default class AppSettingsApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.appSettings;

  public static async getAllActions(): Promise<ApiAxiosResponse<Record<string, RoleActionType[]>>> {
    return this.api.get(this.endpoints.getAllActions());
  }
}
