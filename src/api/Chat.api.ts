import APP_CONFIGS from 'redux/APP_CONFIGS';
import { ChatEntity, MessageEntity, SendMessageDto, UpdateMessageDto } from 'types/chat/chat.types';
import { ClientApi } from './client.api';
import { ApiHeaders, ApiQueryParams, ApiResponse } from './api.types';
import { BaseApiClass } from './abstract-base-api-class.helper';
import { UUID } from 'types/utils.types';

export namespace ChatMessagesApiTypes {
  export type FindAllQuery = Pick<ApiQueryParams, 'dataView' | 'limit' | 'offset'> & {
    chatId: string;
    messageId?: string;
  };
  export type FindOneQuery = {
    _id?: UUID;
  };
}
class ChatMessagesApi extends BaseApiClass {
  private static _api = ClientApi.clientRef;
  private static _endpoints = APP_CONFIGS.endpoints.chat.messages;
  public static send = (input?: { data: SendMessageDto }): Promise<ApiResponse<MessageEntity>> => {
    return this._api.post(this._endpoints.send(), input?.data, {
      headers: this.headers,
    });
  };
  public static update = (input?: { data: UpdateMessageDto }): Promise<ApiResponse<MessageEntity>> => {
    return this._api.patch(this._endpoints.update(), input?.data, {
      headers: this.headers,
    });
  };

  public static getAll = (
    _?: undefined,
    params?: ChatMessagesApiTypes.FindAllQuery
  ): Promise<ApiResponse<MessageEntity[]>> => {
    return this._api.get(this._endpoints.getAll(), {
      params,
      headers: this.headers,
    });
  };
}

export namespace ChatApiTypes {
  export interface FindOneQuery {
    _id?: string;
    orderId?: string;
    offerId?: string;
  }
}

export class ChatApi extends BaseApiClass {
  private static _api = ClientApi.clientRef;
  private static _endpoints = APP_CONFIGS.endpoints.chat;
  public static messages = ChatMessagesApi;

  static setHeader(key: ApiHeaders | string, value: string) {
    this.headers[key] = value;
    this.messages.setHeader(key, value);
    return this;
  }
  static removeHeader(key: ApiHeaders | string) {
    delete this.headers[key];
    this.messages.removeHeader(key);
    return this;
  }
  public static getOne = (_?: undefined, params?: ChatApiTypes.FindOneQuery): Promise<ApiResponse<ChatEntity>> => {
    return this._api.get(this._endpoints.getOne(), {
      params,
      headers: this.headers,
    });
  };

  public static create = (input?: { data: { orderId?: string } }): Promise<ApiResponse<ChatEntity>> => {
    return this._api.post(this._endpoints.create(), input?.data, {
      headers: this.headers,
    });
  };
  public static getAll = (_input?: {
    // data: { orderId?: string };
  }): Promise<ApiResponse<ChatEntity[]>> => {
    return this._api.get(this._endpoints.getAll(), {
      headers: this.headers,
    });
  };
}
