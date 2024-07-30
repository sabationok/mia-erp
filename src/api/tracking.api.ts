import { PartialRecord, Values } from 'types/utils.types';
import { ApiHeaders } from './api.types';
import { CreateTrackingLinkDto, TrackingLinkEntity } from '../types/tracking';
import { ApiResponse } from 'redux/app-redux.types';
import { ClientApi } from './client.api';

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
  private static readonly _endpoints = ClientApi._endpoints.tracking.links;

  static switchToCrmClient(headers: typeof this.headers) {
    this.headers = headers;
  }

  public static create = (
    data?: CreateTrackingLinkDto,
    params?: { getExist?: boolean; canUpdate?: boolean }
  ): Promise<ApiResponse<{ updated?: boolean; exist: boolean; link: TrackingLinkEntity }>> => {
    return this._api.post(this._endpoints.create(), data, {
      headers: this.headers as any,
      params,
    });
  };
  public static getAll = (_?: undefined, params?: GetAllLinksQuery): Promise<ApiResponse<TrackingLinkEntity[]>> => {
    return this._api.get(this._endpoints.getAll(), {
      params,
      headers: this.headers as any,
    });
  };
  public static track = (data?: { code: string }): Promise<ApiResponse<TrackingLinkEntity>> => {
    return this._api.post(this._endpoints.track(), data, {
      headers: this.headers as any,
    });
  };
}

export class TrackingApi {
  public static links = TrackingLinksApi;
}
