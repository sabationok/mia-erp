import FlexBox from '../atoms/FlexBox';
import { ChatWsInitializer } from '../Ws/ChatWsInitializer';
import React, { useEffect, useRef, useState } from 'react';
import { useChatSelector } from '../../redux/selectors.store';
import { useAppDispatch } from '../../redux/store.store';
import { createChatThunk, getChatMessagesThunk, getChatThunk } from '../../redux/chat/chat.thunks';
import { useLoaders } from '../../Providers/Loaders/useLoaders.hook';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AxiosError, HttpStatusCode } from 'axios';
import { ChatWs } from '../../socket';

interface ChatForm {
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
  const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const chat = chatId ? chatState.dataMap[chatId] : orderId ? chatState.keysMap[orderId] : undefined;

  useEffect(() => {
    if (chat) return;

    dispatch(getChatThunk({ data: { data: { params: { chatId, orderId } } } }));
  }, [chat, chatId, dispatch, orderId]);

  const isConnected = chatState.wsConnectionStatus;
  const { watch, resetField, register, setValue, handleSubmit } = useForm<ChatForm>({
    defaultValues: { chatId },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const formValues = watch();
  const createChat = ({ orderId }: { orderId: string }) => {
    dispatch(
      createChatThunk({
        onLoading: loaders.onLoading('chat'),
        onSuccess: ({ data }) => {
          setValue('chatId', data._id);
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
        params: params,
        onLoading: loaders.onLoading('messages'),
      })
    );
  };

  const getChat = (params: { chatId?: string; orderId?: string }) => {
    dispatch(
      getChatThunk({
        params: params,
        onLoading: loaders.onLoading('chat'),

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
    if (chatId) {
      getChat({ chatId });
    } else if (orderId) {
      getChat({ orderId });
    }
    // eslint-disable-next-line
  }, [chatId, orderId]);

  const setTyping = () => {
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = undefined;
    typingTimeoutRef.current = setTimeout(() => {
      ChatWs.handleTyping({
        data: { status: false, chatId: chatId ?? '' },
      });

      typingTimeoutRef.current = undefined;
    }, 2000);
  };

  return (
    <FlexBox overflow={'auto'}>
      <ChatWsInitializer />
    </FlexBox>
  );
};

export default Chat;
