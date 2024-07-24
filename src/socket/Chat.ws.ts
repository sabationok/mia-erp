import { WsClient, WsResponse } from './index';
import { WsClientEventPayload, WsClientEventsMap, WsEventsMap } from './AppSocket';
import { MessageEntity, SendMessageDto } from 'types/chat/chat.types';

export namespace WsChat {
  export enum EventNames {
    joinedToRoom = 'room/joined',
    invitedToRoom = 'room/invited',
    leavedRoom = 'room/leaved',
    removedFromRoom = 'room/removed',
    messages_typing = 'messages/typing',
    messages_send = 'messages/send',
    messages_update = 'messages/update',
  }
  export interface Response<
    Data = any,
    Query = Record<string, string>,
    Cookies = Record<string, string>,
    Headers = Record<string, string>,
  > extends WsResponse<Data & { chatId: string; member?: ChatSenderEntity }, Query, Cookies, Headers> {}
  export interface ChatSenderEntity {
    _id: string;
    user?: { _id: string; email?: string };
    customer?: { _id: string; email?: string };
    integration?: { _id: string; label?: string };
    bot?: { _id: string; label?: string };
  }

  export namespace ServerEvents {
    export type OnJoinOrLeaveMember = Response<{
      member: ChatSenderEntity;
      chatId: string;
    }>;
    export type OnTyping = Response<{
      status: boolean;
      member?: ChatSenderEntity;
      chatId: string;
    }>;
    export type OnSendMessage = Response<MessageEntity>;
  }
  export interface ListenersMap extends WsEventsMap {
    [EventNames.messages_send]: (data: ServerEvents.OnSendMessage) => void;
    [EventNames.messages_typing]: (data: ServerEvents.OnTyping) => void;
    [EventNames.joinedToRoom]: (data: ServerEvents.OnJoinOrLeaveMember) => void;
    [EventNames.leavedRoom]: (data: ServerEvents.OnJoinOrLeaveMember) => void;
  }
  export interface EventPayload<Data = any, Params = any, Query = any, Headers = any>
    extends WsClientEventPayload<
      Data & {
        chatId: string;
        sender?: ChatSenderEntity;
      },
      Params,
      Query,
      Headers
    > {}
  export interface ClientEventsMap extends WsClientEventsMap {
    [EventNames.messages_typing]: EventPayload<{
      status: boolean;
    }>;
    [EventNames.messages_send]: EventPayload<SendMessageDto>;

    [EventNames.joinedToRoom]: EventPayload<{ chatId: string }>;
    [EventNames.leavedRoom]: EventPayload<{ chatId: string }>;
  }
}

export class ChatWs {
  public static _ws = WsClient;

  public static _socket = this._ws.addSocket<WsChat.ListenersMap, WsChat.ClientEventsMap>('chat');

  public static get socketRef() {
    return this._socket;
  }
  public static onConnect(listener: () => void) {
    this._socket.onConnect(listener);
    return this;
  }
  public static onConnectError(listener: (error: any) => void) {
    this._socket.onConnectError(listener);
    return this;
  }
  public static onDisconnect(listener: () => void) {
    this._socket.onDisconnect(listener);
    return this;
  }

  public static onJoin = this._socket._buildSubscriber(WsChat.EventNames.joinedToRoom);
  public static onLeave = this._socket._buildSubscriber(WsChat.EventNames.joinedToRoom);
  public static onSend = this._socket._buildSubscriber(WsChat.EventNames.messages_send);
  public static onTyping = this._socket._buildSubscriber(WsChat.EventNames.messages_typing);
  // * ================================================================
  public static handleTyping = this._socket.buildEmitter(WsChat.EventNames.messages_typing);
  public static handleJoin = this._socket.buildEmitter(WsChat.EventNames.joinedToRoom);
  public static handleLeave = this._socket.buildEmitter(WsChat.EventNames.leavedRoom);
  public static send = this._socket.buildEmitter(WsChat.EventNames.messages_send);
}
