import { ClientApi } from 'api/client.api';
import { UserEntity } from 'types/auth/auth.types';
import { IBase } from 'types/utils.types';
import { ApiAxiosResponse } from '../api.types';
import { Auth } from './auth.api';

export namespace Device {
  export interface Entity extends IBase {
    user?: UserEntity;
    session?: Auth.Session.Entity;
    trackId?: string;
  }

  export interface AttachDto {}
  export interface RegisterDto {
    timeZone?: string;
    locale?: string;
    os?: string;
    aspectRatio?: string;
  }
  export class Api {
    private static _api = ClientApi.clientRef;
    private static _ends = ClientApi._endpoints.auth.devices;

    public static attach = (data?: AttachDto): Promise<ApiAxiosResponse<Device.Entity>> => {
      return this._api.post(this._ends.attach(), data);
    };
  }
}
