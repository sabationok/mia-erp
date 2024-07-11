import APP_CONFIGS from '../redux/APP_CONFIGS';
import { ApiResponse } from '../redux/app-redux.types';
import { ICommunicationMethod, ICommunicationMethodReqData } from '../types/integrations.types';
import { ClientApi } from './client.api';

export default class CommunicationApi {
  private static api = ClientApi.clientRef;
  private static endpoints = APP_CONFIGS.endpoints.communications;

  public static getAllMethods(): Promise<ApiResponse<ICommunicationMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods());
  }
  public static updateMethod(data?: ICommunicationMethodReqData) {
    return this.api.patch(this.endpoints.updateMethod(data?._id), data?.data, { params: data?.params });
  }
}
