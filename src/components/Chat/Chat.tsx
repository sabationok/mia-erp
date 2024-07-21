import FlexBox, { FlexForm } from '../atoms/FlexBox';
import { ChatWsInitializer } from '../Ws/ChatWsInitializer';
import React, { useEffect, useRef, useState } from 'react';
import { useChatSelector } from '../../redux/selectors.store';
import { useAppDispatch } from '../../redux/store.store';
import {
  createChatThunk,
  getChatMessagesThunk,
  getChatThunk,
  sendChatMessageThunk,
} from '../../redux/chat/chat.thunks';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AxiosError, HttpStatusCode } from 'axios';
import { ChatWs } from '../../socket';
import styled from 'styled-components';
import InputText from '../atoms/Inputs/InputText';
import ButtonIcon from '../atoms/ButtonIcon';
import { ChatEntity } from '../../types/chat/chat.types';
import { ToastService } from '../../services';
import { addChatMessageAction } from 'redux/chat/chat.slice';
import { omit } from 'lodash';
import { UUID } from '../../types/utils.types';

interface ChatFormData {
  chatId: string;
  text: string;
}

const validation = yup.object().shape({
  text: yup.string().required(),
  chatId: yup.string().uuid().required(),
});
export const Chat = ({ orderId, customerId, chatId }: { orderId?: string; customerId?: string; chatId?: string }) => {
  const chatState = useChatSelector();
  const dispatch = useAppDispatch();

  const loaders = useLoaders<'send' | 'wait' | 'getAll' | 'messages' | 'chat'>();

  const [isSomeoneTyping, set_isSomeoneTyping] = useState(false);
  const [chat, setChat] = useState<ChatEntity | undefined>(() => {
    const id = chatId || (orderId ? chatState.keysMap[orderId] : undefined);

    return id ? chatState.dataMap[id] : undefined;
  });

  const [isTypingMap, setIsTypingMap] = useState<
    Record<
      UUID,
      {
        email?: string;
        name?: string;
      }
    >
  >({});

  const setTyping = (data: typeof isTypingMap) => {
    setIsTypingMap(prev => ({ ...prev, ...data }));
  };
  const unSetTyping = (key: string) => {
    setIsTypingMap(prev => omit(prev, [key]));
  };

  const isConnected = chatState.wsConnectionStatus;

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
  const loadMessages = (params: { chatId: string }) => {
    dispatch(
      getChatMessagesThunk({
        params,
        onLoading: loaders.onLoading('messages'),
      })
    );
  };
  const getChat = (params: { chatId?: string; orderId?: string }) => {
    dispatch(
      getChatThunk({
        params: params,
        onLoading: loaders.onLoading('chat'),
        onSuccess: ({ data }) => {
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
  useEffect(() => {
    console.log('from props', { chatId, orderId });

    if (chatId) {
      const chat = chatState.dataMap[chatId];
      if (!chat) {
        getChat({ chatId });
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
        chatId={chatId}
        onTyping={data => {
          console.log('onTyping | data', data);
          if (data.data.sender) {
            if (data.data.status) {
              setTyping({ [data.data.sender?._id]: { email: 'email' } });
            } else {
              unSetTyping(data.data.sender?._id);
            }
          }
        }}
        onJoin={data => {
          ToastService.info(`${data.data?.email || data.data?.label} joined to chat`);
        }}
        onLeave={data => {
          ToastService.info(`${data.data?.email || data.data?.label} leaved to chat`);
        }}
        onSend={data => {
          const chatId = data.data.chat?._id;
          chatId && dispatch(addChatMessageAction({ chatId, data: data.data }));
        }}
      />

      <MessagesList overflow={'auto'} flex={1}></MessagesList>

      {isSomeoneTyping && <FlexBox padding={'16px'}>{'some one typing'}</FlexBox>}
      {isConnected && <FlexBox padding={'16px'}>{'Is connected'}</FlexBox>}
      <ChatForm
        chatId={chat?._id}
        onSubmit={data => {
          data.chatId &&
            dispatch(
              sendChatMessageThunk({
                data: {
                  data: { data },
                },
              })
            );
        }}
      ></ChatForm>
    </FlexBox>
  );
};

const MessagesList = styled(FlexBox)``;
const ChatForm = ({ chatId, onSubmit }: { chatId?: string; onSubmit?: (data: ChatFormData) => void }) => {
  const { watch, resetField, register, setValue, handleSubmit } = useForm<ChatFormData>({
    defaultValues: { chatId },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  // const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const typingRef = useRef<boolean>();

  const formValues = watch();

  // const setTyping = () => {
  //   clearTimeout(typingTimeoutRef.current);
  //   typingTimeoutRef.current = undefined;
  //   typingTimeoutRef.current = setTimeout(() => {
  //     ChatWs.handleTyping({
  //       data: { status: false, chatId: chatId ?? '' },
  //     });
  //
  //     typingTimeoutRef.current = undefined;
  //   }, 2000);
  // };

  useEffect(() => {
    if (chatId) {
      setValue('chatId', chatId);
    }
  }, [chatId, setValue]);

  return (
    <FlexForm
      padding={'16px 8px 16px'}
      fxDirection={'row'}
      gap={12}
      alignItems={'center'}
      onSubmit={handleSubmit(data => {
        onSubmit && onSubmit(data);
        resetField('text');
      })}
    >
      <InputText
        height={'100%'}
        {...register('text', {
          required: true,
          onChange: () => {
            if (!typingRef.current) {
              typingRef.current = true;
              ChatWs.handleTyping({
                data: { status: true, chatId: chatId ?? '' },
              });
            }
          },
          onBlur: () => {
            typingRef.current = false;
            ChatWs.handleTyping({
              data: { status: false, chatId: chatId ?? '' },
            });
          },
        })}
      ></InputText>

      <ButtonIcon
        type={'submit'}
        disabled={!formValues.text}
        variant={'filled'}
        sizeType={'middle'}
        endIcon={'send'}
      ></ButtonIcon>
    </FlexForm>
  );
};
export default Chat;
