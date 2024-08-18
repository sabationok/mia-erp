import { Device } from 'api/auth/Devices.api';
import { IBase } from 'types/utils.types';
import { OAuth } from './o-auth.namespace';

export namespace AppAuth {
  export interface SessionDto {
    access_token: string;
    refresh_token?: string;
  }

  export type SaveTokensDto = {
    access_token: string;
    refresh_token: string;
    clientId: string;
    userId: string;
  } & (
    | {
        providerId: string;
      }
    | {
        provider: OAuth.ProviderEnum;
      }
  );
  export interface SessionBaseEntity {
    access_token: string;
    refresh_token?: string;
  }
  export interface SessionEntity extends IBase, SessionBaseEntity {
    device?: Device.Entity;
    oauth?: OAuth.Profile.Entity;
  }
}
