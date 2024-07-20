import APP_CONFIGS from 'redux/APP_CONFIGS';
import { ChatEntity, MessageEntity, SendMessageDto, UpdateMessageDto } from 'types/chat/chat.types';
import { ClientApi } from './client.api';
import { ApiResponse, AppQueryParams } from './api.types';

class ChatMessagesApi {
  private static _api = ClientApi.clientRef;
  private static _endpoints = ClientApi._endpoints.chat.messages;
  public static send = (input?: { data: SendMessageDto }): Promise<ApiResponse<MessageEntity>> => {
    return this._api.post(this._endpoints.send(), input?.data);
  };
  public static update = (input?: { data: UpdateMessageDto }): Promise<ApiResponse<MessageEntity>> => {
    return this._api.patch(this._endpoints.update(), input?.data);
  };

  public static getAll = (input?: {
    params: Pick<AppQueryParams, 'dataView' | 'limit' | 'offset'> & {
      chatId: string;
      messageId?: string;
    };
  }): Promise<ApiResponse<MessageEntity[]>> => {
    return this._api.get(this._endpoints.getAll(), input);
  };
}
export class ChatApi {
  private static _api = ClientApi.clientRef;
  private static _endpoints = APP_CONFIGS.endpoints.chat;
  public static messages = ChatMessagesApi;
  public static getOne = (input?: {
    params: { chatId?: string; orderId?: string; offerId?: string };
  }): Promise<ApiResponse<ChatEntity>> => {
    return this._api.get(this._endpoints.getOne(), input);
  };

  public static create = (input?: {
    dto: { orderId?: string; receiverId?: string };
  }): Promise<ApiResponse<ChatEntity>> => {
    return this._api.post(this._endpoints.create(), input?.dto);
  };
  public static getAll = (_input?: {
    // data: { orderId?: string };
  }): Promise<ApiResponse<ChatEntity[]>> => {
    return this._api.get(this._endpoints.getAll());
  };
}
