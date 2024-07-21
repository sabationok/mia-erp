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

  useEffect(() => {
    if (chat) return;

    dispatch(getChatThunk({ data: { data: { params: { chatId, orderId } } } }));
  }, [chat, chatId, dispatch, orderId]);

  const isConnected = chatState.wsConnectionStatus;

  const createChat = ({ orderId }: { orderId: string }) => {
    dispatch(
      createChatThunk({
        onLoading: loaders.onLoading('chat'),
        onSuccess: ({ data }) => {
          setChat(data);
        },
        data: {
          data: { dto: { orderId } },
        },
      })
    );
  };

  const loadMessages = (params: { chatId: string }) => {
    dispatch(
      getChatMessagesThunk({
        data: { data: { params } },
        onLoading: loaders.onLoading('messages'),
      })
    );
  };

  const getChat = (params: { chatId?: string; orderId?: string }) => {
    dispatch(
      getChatThunk({
        data: { data: { params } },
        onLoading: loaders.onLoading('chat'),
        onSuccess: ({ data }) => {
          // loadMessages({ chatId: data._id });
          setChat(data);
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
    const unsubsribers = [
      ChatWs.onTyping(data => {
        console.log(data);
        set_isSomeoneTyping(data.data.status);
      }),
    ];

    return () => {
      unsubsribers.forEach(clbck => clbck());
    };
  }, []);

  useEffect(() => {
    if (chat) return;

    if (chatId) {
      getChat({ chatId });
    } else if (orderId) {
      getChat({ orderId });
    }
    // eslint-disable-next-line
  }, [chatId, orderId]);

  return (
    <FlexBox overflow={'hidden'} flex={1}>
      <ChatWsInitializer />

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
