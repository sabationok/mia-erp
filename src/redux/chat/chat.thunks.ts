import { ChatApi } from 'api';
import { createAppAsyncThunk } from 'redux/createAppAsynkThunk';

enum ChatThunkType {
  getOne = 'chat/getOneThunk',
  create = 'chat/createThunk',
  getAll = 'chat/getAllThunk',
  messages_getAll = 'chat/messages/getAllThunk',
  messages_send = 'chat/messages/sendThunk',
}

export const getChatThunk = createAppAsyncThunk(ChatThunkType.getOne, ChatApi.getOne);
export const getChatListThunk = createAppAsyncThunk(ChatThunkType.getAll, ChatApi.getAll);
export const createChatThunk = createAppAsyncThunk(ChatThunkType.create, ChatApi.create);

export const getChatMessagesThunk = createAppAsyncThunk(ChatThunkType.messages_getAll, ChatApi.messages.getAll);

export const sendChatMessageThunk = createAppAsyncThunk(ChatThunkType.messages_send, ChatApi.messages.send);
