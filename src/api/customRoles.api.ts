import { ApiAxiosResponse } from './api.types';
import { ModuleWithActions } from '../redux/customRoles/customRoles.types';
import { ClientApi } from './client.api';

class ActionsApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.customRoles;

  public static getAll = (): Promise<ApiAxiosResponse<ModuleWithActions[]>> => {
    return this._client.get(this.endpoints.actions.getAll());
  };
}
export default class CustomRolesApi {
  static actions = ActionsApi;
  // private static _client = ClientApi.clientRef;
  // private static endpoints = ClientApi._endpoints.customRoles;
}
