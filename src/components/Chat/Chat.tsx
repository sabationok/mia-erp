import FlexBox, { FlexForm } from '../atoms/FlexBox';
import { ChatWsInitializer } from '../Ws/ChatWsInitializer';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { ChatMessage } from './components/ChatMessage';
import { useScrollTo } from '../../hooks';

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
  const {
    listRef: messagesBoxRef,
    scrollTo,
    id: itemId,
  } = useScrollTo('scrollItem', { horizontal: false, preventDefault: false });

  const loaders = useLoaders<'send' | 'wait' | 'getAll' | 'messages' | 'chat'>();

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
  const renderMessages = useMemo(() => {
    const mapKey = chat?._id;

    if (!mapKey) return null;

    const list = chatState.messages.listsMap[mapKey];

    return list?.map(msg => {
      const isRequest = !!msg.sender?.user;

      return <ChatMessage key={msg._id} msg={msg} isRequest={isRequest} />;
    });
  }, [chat?._id, chatState.messages.listsMap]);

  useEffect(() => {
    if (renderTypings.length) {
      itemId && scrollTo(itemId);
    }
  }, [itemId, renderTypings.length, scrollTo]);

  useEffect(() => {
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

      <MessagesList ref={messagesBoxRef}>
        {renderMessages}

        <FlexBox className={itemId?.toString()} id={itemId?.toString()} fillWidth></FlexBox>
      </MessagesList>

      {!!renderTypings?.length && (
        <FlexBox gap={12} padding={'8px 16px'}>
          {renderTypings}
        </FlexBox>
      )}

      {!isConnected && <FlexBox padding={'16px'}>{'Is not connected'}</FlexBox>}

      <ChatForm chatId={chat?._id}></ChatForm>
    </FlexBox>
  );
};

const MessagesList = styled(FlexBox)`
  //flex-direction: column-reverse;
  gap: 8px;
  padding: 8px;

  flex: 1;
  overflow: auto;
`;

const ChatForm = ({ chatId, onSubmit }: { chatId?: string; onSubmit?: (data: ChatFormData) => void }) => {
  const { watch, resetField, register, setValue, handleSubmit } = useForm<ChatFormData>({
    defaultValues: { chatId },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  // const typingTimeoutRef = useRef<NodeJS.Timeout>();
  const typingRef = useRef<boolean>();
  const dispatch = useAppDispatch();
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
      onSubmit={handleSubmit(fData => {
        dispatch(
          sendChatMessageThunk({
            data: {
              data: { data: fData },
            },
            onSuccess: () => {
              resetField('text');
            },
          })
        );
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
