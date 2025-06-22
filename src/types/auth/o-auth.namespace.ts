import { IBase, OnlyUUID, PartialRecord, UUID } from 'types/utils.types';
import { AppAuth } from './auth.namespace';
import { UserEntity } from './auth.types';
import { Connections } from '../integrations.types';

export namespace OAuth {
  export namespace Provider {
    export enum TypeEnum {
      facebook = 'facebook',
      refme = 'refme',
      google = 'google',
      mia = 'mia',
    }
    export const ScopesByType: PartialRecord<TypeEnum, string[]> = {
      [TypeEnum.google]: ['email', 'profile', 'openID'],
      [TypeEnum.facebook]: ['email', 'profile', 'openID'],
      [TypeEnum.refme]: ['email', 'reference', 'openID', 'wallets', 'profile'],
      [TypeEnum.mia]: ['email', 'reference', 'openID', 'profile'],
    };

    export type ProviderScopesMap = {
      [key in TypeEnum]: string[];
    } & {
      [TypeEnum.google]: ('email' | 'profile' | 'openid')[];
      [TypeEnum.refme]: ('email' | 'reference' | 'wallets' | 'profile')[];
    };
  }

  export namespace Connection {
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
      provider?: OAuth.Provider.TypeEnum;
      endpoints?: EndpointsMap;
      scopes?: string[];
      domain?: string;
      origin?: string;
      supportInfo?: {
        email?: string;
      };
    }

    interface BaseMia extends Base {
      provider?: OAuth.Provider.TypeEnum.mia;
      // publicKey: string;
      // privateKey: string;
    }
    interface BaseOther extends Base {
      provider?: Exclude<OAuth.Provider.TypeEnum, 'mia'>;

      publicKey: string;
      privateKey: string;
    }
    export interface Entity extends IBase, Base {
      publicKey: string;
      privateKey: string;

      isActive?: boolean;
      status?: string;

      consumer?: Connections.Output.Entity;
    }
    interface _CreateDto {
      connectionId: string;
    }

    export type CreateDto = _CreateDto & (BaseMia | BaseOther);

    export interface _UpdateDto extends OnlyUUID {}

    export type UpdateDto = _UpdateDto & (BaseMia | BaseOther);

    export interface GetAllQuery {
      consumerId?: UUID;
      ids?: UUID[];
    }

    export type ExtraDataByType = {
      [key in Provider.TypeEnum]: Record<string, any>;
    } & {
      [Provider.TypeEnum.google]: {};
      [Provider.TypeEnum.refme]: {};
    };
    export type LogInDtoByType = {
      [key in Provider.TypeEnum]: Record<string, any>;
    } & {
      [Provider.TypeEnum.google]: {
        redirect_uri: string;
        state?: string;
        response_type: 'code';
        client_id: string;
      };
      [Provider.TypeEnum.refme]: {
        redirect?: true;
        clientId: string;
        redirectUri: string;
        responseType: 'code';
      };
    };
  }

  export namespace Profile {
    export interface BaseEntity<P extends Provider.TypeEnum = any> {
      provider: P;
      extId?: string;
      email: string;
      extra?: Connection.ExtraDataByType[P];
    }
    export interface Entity<P extends Provider.TypeEnum = any> extends IBase, BaseEntity<P> {
      user?: UserEntity;
      session?: AppAuth.SessionEntity;
    }
  }
  export namespace Server {
    export interface SaveTokensDto<P extends Provider.TypeEnum> extends AppAuth.SessionDto {
      userId: string;
      provider: P;
      extra?: Connection.ExtraDataByType[P];
    }
    export type GetAuthUrlQuery<P extends Provider.TypeEnum = Provider.TypeEnum> = {
      provider: P;
      userId?: string;
      scopes?: Provider.ProviderScopesMap[P];
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
      provider: OAuth.Provider.TypeEnum;
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
