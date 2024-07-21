import { WsClient, WsResponse } from './index';
import { WsClientEventPayload, WsClientEventsMap, WsEventsMap } from './AppSocket';
import { SendMessageDto } from 'types/chat/chat.types';

enum EventNames {
  onReply = 'onReply',
  messages_typing = 'messages/typing',
  messages_send = 'messages/send',
}

export interface WsChatResponse<
  Data = any,
  Query = Record<string, string>,
  Cookies = Record<string, string>,
  Headers = Record<string, string>,
> extends WsResponse<Data & { chatId: string; sender: ChatSenderEntity }, Query, Cookies, Headers> {}

export interface ChatSenderEntity {
  _id: string;
  user?: { _id: string; email?: string };
  customer?: { _id: string; email?: string };
  integration?: { _id: string; label?: string };
  bot?: { _id: string; label?: string };
}
export interface ChatWsListenersMap extends WsEventsMap {
  [EventNames.onReply]: (data: WsChatResponse) => void;
  [EventNames.messages_typing]: (data: WsChatResponse<{ status: boolean }>) => void;
}

export interface WsChatEventPayload<Data = any, Params = any, Query = any, Headers = any>
  extends WsClientEventPayload<
    Data & {
      chatId: string;
      sender?: ChatSenderEntity;
    },
    Params,
    Query,
    Headers
  > {}

interface ChatWsClientEventsMap extends WsClientEventsMap {
  [EventNames.messages_typing]: WsChatEventPayload<{
    status: boolean;
  }>;
  [EventNames.messages_send]: WsChatEventPayload<SendMessageDto>;
}

export class ChatWs {
  public static _ws = WsClient;

  public static _socket = this._ws.addSocket<ChatWsListenersMap, ChatWsClientEventsMap>('');

  public static get socketRef() {
    return this._socket;
  }
  public static onReply = this._socket.buildSubscriber(EventNames.onReply);
  public static onTyping = this._socket.buildSubscriber(EventNames.messages_typing);

  public static onSend = this._socket.buildEmitter(EventNames.messages_send);

  public static handleTyping = this._socket.buildEmitter(EventNames.messages_typing);

  public static send = this._socket.buildEmitter(EventNames.messages_send);
}
