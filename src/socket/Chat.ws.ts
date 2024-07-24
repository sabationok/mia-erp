import { WsClient, WsResponse } from './index';
import { WsClientEventPayload, WsClientEventsMap, WsEventListenersMap } from './AppSocket';
import { MessageEntity, SendMessageDto } from 'types/chat/chat.types';

export interface WsChatResponse<
  Data = any,
  Query = Record<string, string>,
  Cookies = Record<string, string>,
  Headers = Record<string, string>,
> extends WsResponse<Data & { chatId: string; sender?: ChatSenderEntity }, Query, Cookies, Headers> {}
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

enum EventNames {
  joinedToRoom = 'room/joined',
  invitedToRoom = 'room/invited',
  leavedRoom = 'room/leaved',
  removedFromRoom = 'room/removed',
  messages_typing = 'messages/typing',
  messages_send = 'messages/send',
  messages_update = 'messages/update',
}
export namespace WsChat {
  export interface Member {
    _id: string;
    user?: { _id: string; email?: string };
    customer?: { _id: string; email?: string };
    integration?: { _id: string; label?: string };
    bot?: { _id: string; label?: string };
  }
}
export type ChatSenderEntity = WsChat.Member;

export namespace ChatServerEvents {
  export type OnJoinOrLeaveMember = WsChatResponse<{
    member: ChatSenderEntity;
    chatId: string;
  }>;
  export type OnTyping = WsChatResponse<{ status: boolean; chatId: string; member?: ChatSenderEntity }>;
  export type OnSendMessage = WsChatResponse<MessageEntity>;
}
export interface ChatWsListenersMap extends WsEventListenersMap {
  [EventNames.messages_send]: (data: ChatServerEvents.OnSendMessage) => void;
  [EventNames.messages_typing]: (data: ChatServerEvents.OnTyping) => void;
  [EventNames.joinedToRoom]: (data: ChatServerEvents.OnJoinOrLeaveMember) => void;
  [EventNames.leavedRoom]: (data: ChatServerEvents.OnJoinOrLeaveMember) => void;
}
interface ChatWsClientEventsMap extends WsClientEventsMap {
  [EventNames.messages_typing]: WsChatEventPayload<{
    status: boolean;
  }>;
  [EventNames.messages_send]: WsChatEventPayload<SendMessageDto>;

  [EventNames.joinedToRoom]: WsChatEventPayload<{ chatId: string }>;
  [EventNames.leavedRoom]: WsChatEventPayload<{ chatId: string }>;
}
export class ChatWs {
  private static _ws = WsClient;

  public static _socket = this._ws.addSocket<ChatWsListenersMap, ChatWsClientEventsMap>('chat');

  public static get socketRef() {
    return this._socket;
  }

  public static onConnect(listener: () => void): () => void {
    return this._socket.onConnect(listener);
  }
  public static onConnectError(listener: (error: any) => void): () => void {
    return this._socket.onConnectError(listener);
  }
  public static onDisconnect(listener: () => void): () => void {
    return this._socket.onDisconnect(listener);
  }

  public static onJoin = this._socket._buildSubscriber(EventNames.joinedToRoom);
  public static onLeave = this._socket._buildSubscriber(EventNames.joinedToRoom);
  public static onTyping = this._socket._buildSubscriber(EventNames.messages_typing);

  public static onSend = this._socket._buildSubscriber(EventNames.messages_send);

  public static handleTyping = this._socket.buildEmitter(EventNames.messages_typing);
  public static handleJoin = this._socket.buildEmitter(EventNames.joinedToRoom);
  public static handleLeave = this._socket.buildEmitter(EventNames.leavedRoom);
  public static handleSend = this._socket.buildEmitter(EventNames.messages_send);
}
