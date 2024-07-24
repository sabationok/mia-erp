import FlexBox from '../atoms/FlexBox';
import { ChatWsInitializer } from '../Ws/ChatWsInitializer';
import React, { useEffect, useMemo, useState } from 'react';
import { useChatSelector, usePermissionsSelector } from '../../redux/selectors.store';
import { useAppDispatch } from '../../redux/store.store';
import { createChatThunk, getChatMessagesThunk, getChatThunk } from '../../redux/chat/chat.thunks';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';

import { AxiosError, HttpStatusCode } from 'axios';
import styled from 'styled-components';
import { ChatEntity } from '../../types/chat/chat.types';
import { ToastService } from '../../services';
import { addChatMessageAction } from 'redux/chat/chat.slice';
import { omit } from 'lodash';
import { UUID } from '../../types/utils.types';
import { ChatMessage } from './components/ChatMessage';
import ChatForm from './components/ChatForm';
import { ChatApiTypes, ChatMessagesApiTypes } from '../../api';
import ButtonIcon from '../atoms/ButtonIcon';
import { ChatWs } from '../../socket';

type TypingsMap = Record<
  UUID,
  {
    email?: string;
    name?: string;
  }
>;

export const Chat = ({ orderId, chatId }: { orderId?: string; chatId?: string }) => {
  const chatState = useChatSelector();
  const dispatch = useAppDispatch();
  const permissionId = usePermissionsSelector().permission;

  const loaders = useLoaders<'send' | 'wait' | 'getAll' | 'messages' | 'chat'>();

  const [chat, setChat] = useState<ChatEntity | undefined>(() => {
    const id = chatId || (orderId ? chatState.keysMap[orderId] : undefined);

    return id ? chatState.dataMap[id] : undefined;
  });

  const [isTypingMap, setIsTypingMap] = useState<TypingsMap>({});

  const isConnected = chatState.wsConnectionStatus;

  const setTyping = (data: typeof isTypingMap) => {
    setIsTypingMap(prev => ({ ...prev, ...data }));
  };
  const unSetTyping = (key: string) => {
    setIsTypingMap(prev => omit(prev, [key]));
  };

  const createChat = (params: { orderId: string }) => {
    dispatch(
      createChatThunk({
        params,
        onLoading: loaders.onLoading('chat'),
        onSuccess: ({ data }) => {
          setChat(data);
          loadMessages({ chatId: data._id });
        },
      })
    );
  };
  const loadMessages = (params: ChatMessagesApiTypes.FindAllQuery) => {
    dispatch(
      getChatMessagesThunk({
        params,
        onLoading: loaders.onLoading('messages'),
      })
    );
  };
  const getChat = (params: ChatApiTypes.FindOneQuery) => {
    dispatch(
      getChatThunk({
        params,
        onLoading: loaders.onLoading('chat'),
        onSuccess: ({ data }) => {
          setChat(data);
          loadMessages({ chatId: data._id });
        },
        onError: (err: AxiosError) => {
          if (err.response?.status === HttpStatusCode.NotFound) {
            params.orderId && createChat({ orderId: params.orderId });
          }
        },
      })
    );
  };
  const renderTypings = useMemo(() => {
    const list = Object.entries(isTypingMap);

    return list.map(([key, item]) => {
      return (
        <FlexBox $padding={'8px'} key={key}>
          {item?.email || item?.name}
        </FlexBox>
      );
    });
  }, [isTypingMap]);

  const messagesList = useMemo(() => {
    const mapKey = chat?._id;

    if (!mapKey) return null;

    return chatState.messages.listsMap[mapKey];
  }, [chat?._id, chatState.messages.listsMap]);

  const renderMessages = useMemo(() => {
    return messagesList?.map(msg => {
      const isRequest = !!msg.sender?.user;

      return <ChatMessage key={msg._id} msg={msg} isRequest={isRequest} />;
    });
  }, [messagesList]);

  useEffect(() => {
    if (chatId) {
      const chat = chatState.dataMap[chatId];
      if (!chat) {
        getChat({ _id: chatId });
      } else {
        setChat(chat);
        loadMessages({ chatId });
      }
    } else if (orderId) {
      getChat({ orderId });
    }
    // eslint-disable-next-line
  }, [chatId, orderId]);

  return (
    <FlexBox overflow={'hidden'} flex={1}>
      <ChatWsInitializer
        // permissionId={profile?.permission?._id}
        chatId={chat?._id}
        onTyping={data => {
          if (data.data.sender) {
            if (data.data.status) {
              setTyping({ [data.data.sender?._id]: { email: 'email' } });
            } else {
              unSetTyping(data.data.sender?._id);
            }
          }
        }}
        onJoin={data => {
          ToastService.info(
            `${
              data.data?.member?.user?.email ||
              data.data?.member?.customer?.email ||
              data.data?.member?.integration?.label
            } joined to chat`
          );
        }}
        onLeave={data => {
          ToastService.info(
            `${
              data.data?.member?.user?.email ||
              data.data?.member?.customer?.email ||
              data.data?.member?.integration?.label
            } leaved to chat`
          );
        }}
        onSend={data => {
          if (data.data?.sender._id === permissionId) {
            console.log({ permissionId, data });
            return;
          }
          const chatId = data.data.chat?._id;
          chatId && dispatch(addChatMessageAction({ chatId, data: data.data }));
        }}
      />

      <MessagesList>{renderMessages}</MessagesList>

      {!!renderTypings?.length && (
        <FlexBox gap={12} padding={'8px 16px'}>
          {renderTypings}
        </FlexBox>
      )}

      {!isConnected && <FlexBox padding={'16px'}>{'Is not connected'}</FlexBox>}

      <ChatForm chatId={chat?._id}></ChatForm>
      <FlexBox padding={'24px 16px'}>
        <ButtonIcon
          variant={'filledMiddle'}
          onClick={() => {
            ChatWs.handleJoin({
              data: {
                chatId: chat?._id ?? 'chatId',
              },
            });
            ChatWs.handleTyping({
              data: {
                chatId: chat?._id ?? 'chatId',
                status: true,
              },
            });
            setTimeout(() => {
              ChatWs.handleTyping({
                data: {
                  chatId: chat?._id ?? 'chatId',
                  status: false,
                },
              });
            }, 1000);
          }}
        >
          {'Join'}
        </ButtonIcon>
      </FlexBox>
    </FlexBox>
  );
};

const MessagesList = styled(FlexBox)`
  flex-direction: column-reverse;
  gap: 8px;
  padding: 8px;

  flex: 1;
  overflow: auto;
`;

export default Chat;
