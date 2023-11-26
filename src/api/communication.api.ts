import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppResponse } from '../redux/global.types';
import baseApi from './baseApi';
import { ICommunicationMethod, ICommunicationMethodReqData } from '../types/integrations.types';

export default class CommunicationApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.communications;

  public static getAllMethods(): Promise<AppResponse<ICommunicationMethod[]>> {
    return this.api.get(this.endpoints.getAllMethods());
  }
  public static updateMethod(data?: ICommunicationMethodReqData) {
    return this.api.patch(this.endpoints.updateMethod(data?._id), data?.data, { params: data?.params });
  }
}
