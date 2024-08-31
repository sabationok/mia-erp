import { ApiAxiosResponse } from '../redux/app-redux.types';
import { ICommunicationMethod, ICommunicationMethodReqData } from '../types/integrations.types';
import { ClientApi } from './client.api';

export default class CommunicationApi {
  private static api = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.communications;

  public static getAllMethods(): Promise<ApiAxiosResponse<ICommunicationMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods());
  }
  public static updateMethod(data?: ICommunicationMethodReqData) {
    return this.api.patch(this.endpoints.updateMethod(data?._id), data?.data, { params: data?.params });
  }
}
