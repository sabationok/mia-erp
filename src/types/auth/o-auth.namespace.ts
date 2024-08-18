import { IBase, PartialRecord } from 'types/utils.types';
import { AppAuth } from './auth.namespace';
import { UserEntity } from './auth.types';

export namespace OAuth {
  export enum ProviderEnum {
    facebook = 'facebook',
    refme = 'refme',
    google = 'google',
    mia = 'mia',
  }

  export namespace Consumer {
    export namespace Configs {
      export enum EndpointName {
        token = 'token',
        auth = 'auth',
        redirect = 'redirect',
        support = 'support',
        terms = 'terms',
        privacyPolicy = 'privacyPolicy',
      }
      export interface EndpointsMap extends PartialRecord<EndpointName | string, string> {}

      interface Base {
        label?: string;
        provider?: OAuth.ProviderEnum;
        endpoints?: EndpointsMap;
        scopes?: string[];
        domain?: string;
        supportInfo?: {
          email?: string;
        };
      }
      export interface Entity extends IBase, Base {
        privateKey: string;
        publicKey: string;

        isActive?: boolean;
        status?: string;
      }
      export interface Dto extends Base {
        connectionId: string;
      }
    }
    export type ExtraDataByType = {
      [key in ProviderEnum]: Record<string, any>;
    } & {
      [ProviderEnum.google]: {};
      [ProviderEnum.refme]: {};
    };
    export type LogInDtoByType = {
      [key in ProviderEnum]: Record<string, any>;
    } & {
      [ProviderEnum.google]: {
        redirect_uri: string;
        state?: string;
        response_type: 'code';
        client_id: string;
      };
      [ProviderEnum.refme]: {
        redirect?: true;
        clientId: string;
        redirectUri: string;
        responseType: 'code';
      };
    };
  }
  export const ScopesByProvider: PartialRecord<ProviderEnum, string[]> = {
    [ProviderEnum.google]: ['email', 'profile', 'openID'],
    [ProviderEnum.refme]: ['email', 'reference', 'openID', 'wallets', 'profile'],
    [ProviderEnum.mia]: ['email', 'reference', 'openID', 'profile'],
  };

  export type ProviderScopesMap = {
    [key in ProviderEnum]: string[];
  } & {
    [ProviderEnum.google]: ('email' | 'profile' | 'openid')[];
    [ProviderEnum.refme]: ('email' | 'reference' | 'wallets' | 'profile')[];
  };

  export type SavedTokensResData = {
    code: string;
    state?: string;
  };

  export namespace Profile {
    export interface BaseEntity<P extends ProviderEnum = any> {
      provider: P;
      extId?: string;
      email: string;
      extra?: Consumer.ExtraDataByType[P];
    }
    export interface Entity<P extends ProviderEnum = any> extends IBase, BaseEntity<P> {
      user?: UserEntity;
      session?: AppAuth.SessionEntity;
    }
  }
  export namespace Server {
    export interface SaveTokensDto<P extends ProviderEnum> extends AppAuth.SessionDto {
      userId: string;
      provider: P;
      extra?: Consumer.ExtraDataByType[P];
    }
    export type GetAuthUrlQuery<P extends ProviderEnum = ProviderEnum> = {
      provider: P;
      userId?: string;
      scopes?: ProviderScopesMap[P];
      state?: string;
      redirectUri?: string;
      redirect?: boolean;
    };
    export type GetAuthUrlResponseData = {
      authUrl: string;
    };
  }
  export namespace Client {
    export interface GetAuthUrlQuery {
      provider: OAuth.ProviderEnum;
      redirect?: boolean;
    }
    export type GetAuthUrlResponseData = {
      authUrl: string;
    };

    export type CallbackQuery = {
      code: string;
      state?: string;
    };
  }
}
