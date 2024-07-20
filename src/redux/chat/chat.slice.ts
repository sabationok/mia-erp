import { createSlice } from '@reduxjs/toolkit';
import { ChatEntity, MessageEntity } from 'types/chat/chat.types';
import { UUID } from 'types/utils.types';
import { getChatListThunk, getChatMessagesThunk, getChatThunk, sendChatMessageThunk } from './chat.thunks';
import { Action } from '../store.store';

export type ChatStateRoom = ChatEntity & { isConnected?: boolean };

enum WsTypeEnum {
  chat = 'chat',
}
export interface ChatState {
  wsConnectionStatusMap: Record<WsTypeEnum, { id: string; status: boolean }>;
  wsConnectionStatus: boolean;
  list: ChatStateRoom[];
  dataMap: Record<UUID, ChatStateRoom>;
  keysMap: Record<UUID, UUID>;
  messages: {
    list: MessageEntity[];
    listsMap: Record<UUID, MessageEntity[]>;
    dataMap: Record<UUID, MessageEntity>;
  };
}

const initSate: ChatState = {
  wsConnectionStatusMap: { [WsTypeEnum.chat]: { id: '', status: false } },
  wsConnectionStatus: false,
  list: [],
  dataMap: {},
  keysMap: {},
  messages: {
    list: [],
    dataMap: {},
    listsMap: {},
  },
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initSate,
  reducers: {
    wsConnectionStatusAction: (
      st,
      { payload: { id, status, type } }: Action<{ type?: WsTypeEnum; id?: string; status: boolean }>
    ) => {
      if (type && id) {
        const current = st.wsConnectionStatusMap[type];
        current.status = status;
        current.id = id;
      } else {
        st.wsConnectionStatus = status;
      }
      return st;
    },
    setChatConnectionStatusAction: (
      st,
      {
        payload: { connected, roomId, orderId },
      }: Action<{
        roomId?: string;
        orderId?: string;
        chatId?: string;
        connected: boolean;
      }>
    ) => {
      const idKey = orderId || roomId;
      if (idKey && st.dataMap[idKey]) {
        st.dataMap[idKey].isConnected = connected;
      }
    },
    addChatAction: (st, { payload: { data } }: Action<{ data: ChatEntity }>) => {
      const idKey = data._id;
      if (idKey) {
        st.dataMap[idKey] = data;
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getChatThunk.fulfilled, (st, a) => {
        const id = a.payload.data._id;
        st.dataMap[id] = a.payload.data;
      })
      .addCase(getChatListThunk.fulfilled, (st, { payload: { data } }) => {
        for (const chat of data) {
          st.dataMap[chat._id] = chat;
        }
      })
      .addCase(getChatMessagesThunk.fulfilled, (st, a) => {
        const chatId = a.payload.params?.chatId;

        if (!chatId) return st;

        const current = st.messages.listsMap[chatId];

        if (current && a.payload.update) {
          current.concat(a.payload.data);
        } else {
          st.messages.listsMap[chatId] = a.payload.data;
        }
      })
      .addCase(sendChatMessageThunk.fulfilled, (st, a) => {
        const chatId = a.payload.data?.chat?._id;

        if (!chatId) return st;

        const current = st.messages.listsMap[chatId];

        if (current) {
          current.concat([a.payload.data]);
        } else {
          st.messages.listsMap[chatId] = [a.payload.data];
        }
      }),
});

export const { setChatConnectionStatusAction, addChatAction, wsConnectionStatusAction } = chatSlice.actions;