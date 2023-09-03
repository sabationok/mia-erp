import baseApi from './baseApi';
import APP_CONFIGS from '../redux/APP_CONFIGS';
import { AppQueryParams } from './index';
import { AppResponse } from '../redux/global.types';
import { IVariationProperty } from '../redux/products/products.types';

export default class VariationsApi {
  private static api = baseApi;
  private static endpoints = APP_CONFIGS.endpoints.variationsApiEndpoints;

  public static async getAll(params?: AppQueryParams): Promise<AppResponse<IVariationProperty>> {
    return this.api.get(this.endpoints.getAll(), {
      params,
    });
  }
}
