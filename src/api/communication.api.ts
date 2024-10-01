import { ApiAxiosResponse } from './api.types';
import { ICommunicationMethod, ICommunicationMethodReqData } from '../types/integrations.types';
import { ClientApi } from './client.api';

export default class CommunicationApi {
  private static _client = ClientApi.clientRef;
  private static endpoints = ClientApi._endpoints.communications;

  public static getAllMethods(): Promise<ApiAxiosResponse<ICommunicationMethod[]>> {
    return this._client.get(this.endpoints.getAllMethods());
  }
  public static updateMethod(data?: ICommunicationMethodReqData) {
    return this._client.patch(this.endpoints.updateMethod(data?._id), data?.data, { params: data?.params });
  }
}
