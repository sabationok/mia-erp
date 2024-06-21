import { PartialRecord, Values } from 'types/utils.types';
import { ApiHeaders } from './api.types';
import { CreateTrackingLinkDto, TrackingLinkEntity } from '../types/tracking';
import { AppResponse } from 'redux/app-redux.types';
import { ClientApi } from './client.api';
import APP_CONFIGS from '../redux/APP_CONFIGS';

export interface GetAllLinksQuery {
  offerId?: string;
}
class TrackingLinksApi {
  static headers: PartialRecord<
    Values<Pick<typeof ApiHeaders, 'x_token_crm' | 'Device_Id' | 'User_Reference'>>,
    string
  > = {};
  // @ts-ignore
  private static readonly _api = ClientApi.clientRef;
  // @ts-ignore
  private static readonly _endpoints = APP_CONFIGS.endpoints.tracking.links;

  static switchToCrmClient(headers: typeof this.headers) {
    this.headers = headers;
  }

  public static create = (
    data?: CreateTrackingLinkDto,
    params?: { getExist?: boolean; canUpdate?: boolean }
  ): Promise<AppResponse<{ updated?: boolean; exist: boolean; link: TrackingLinkEntity }>> => {
    return this._api.post(this._endpoints.create(), data, {
      headers: this.headers as any,
      params,
    });
  };
  public static getAll = (_?: undefined, params?: GetAllLinksQuery): Promise<AppResponse<TrackingLinkEntity[]>> => {
    return this._api.get(this._endpoints.getAll(), {
      params,
      headers: this.headers as any,
    });
  };
  public static track = (data?: { code: string }): Promise<AppResponse<TrackingLinkEntity>> => {
    return this._api.post(this._endpoints.track(), data, {
      headers: this.headers as any,
    });
  };
}

export class TrackingApi {
  public static links = TrackingLinksApi;
}
