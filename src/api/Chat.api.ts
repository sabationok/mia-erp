import APP_CONFIGS from 'redux/APP_CONFIGS';
import { ChatEntity, MessageEntity, SendMessageDto, UpdateMessageDto } from 'types/chat/chat.types';
import { ClientApi } from './client.api';
import { ApiHeaders, ApiResponse, AppQueryParams } from './api.types';
import { BaseApiClass } from './abstract-base-api-class.helper';

class ChatMessagesApi extends BaseApiClass {
  private static _api = ClientApi.clientRef;
  private static _endpoints = ClientApi._endpoints.chat.messages;
  public static send = (input?: { data: SendMessageDto }): Promise<ApiResponse<MessageEntity>> => {
    return this._api.post(this._endpoints.send(), input?.data);
  };
  public static update = (input?: { data: UpdateMessageDto }): Promise<ApiResponse<MessageEntity>> => {
    return this._api.patch(this._endpoints.update(), input?.data);
  };

  public static getAll = (
    _?: undefined,
    params?: Pick<AppQueryParams, 'dataView' | 'limit' | 'offset'> & {
      chatId: string;
      messageId?: string;
    }
  ): Promise<ApiResponse<MessageEntity[]>> => {
    return this._api.get(this._endpoints.getAll(), {
      params,
      headers: this.headers,
    });
  };
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

  public static getOne = (input?: {
    params: { chatId?: string; orderId?: string; offerId?: string };
  }): Promise<ApiResponse<ChatEntity>> => {
    return this._api.get(this._endpoints.getOne(), {
      ...input,
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
