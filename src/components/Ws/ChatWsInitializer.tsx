import React, { useCallback, useEffect } from 'react';
import { wsConnectionStatusAction, WsTypeEnum } from 'redux/chat/chat.slice';
import { useAppDispatch } from 'redux/store.store';
import { ChatServerEvents, ChatWs } from 'socket';
import { ChatMessagesApiTypes } from '../../api';
import { ChatEntity } from '../../types/chat/chat.types';
import { AnyFn } from '../../utils/types';

export interface ChatWsInitializerMethods {
  loadMessages: (params: ChatMessagesApiTypes.FindAllQuery) => void;
  chat?: ChatEntity;
}

// type TypingsMap = Record<
//   UUID,
//   {
//     email?: string;
//     name?: string;
//   }
// >;

export const ChatWsInitializer = React.forwardRef(
  (
    {
      permissionId,
      onConnect,
      onConnectError,
      onJoin,
      onLeave,
      onTyping,
      chatId,
      orderId,
      onSend,
    }: {
      chatId?: string;
      orderId?: string;
      permissionId?: string;
      onConnect?: () => void;
      onConnectError?: (arror: any) => void;
      onJoin?: (data: ChatServerEvents.OnJoinOrLeaveMember) => void;
      onLeave?: (data: ChatServerEvents.OnJoinOrLeaveMember) => void;
      onTyping?: (data: ChatServerEvents.OnTyping) => void;
      onSend?: (data: ChatServerEvents.OnSendMessage) => void;
    },
    ref?: React.ForwardedRef<ChatWsInitializerMethods>
  ) => {
    const dispatch = useAppDispatch();
    const handleConnected = useCallback(() => {
      if (chatId) {
        ChatWs.handleJoin({ data: { chatId } });
      }

      dispatch(
        wsConnectionStatusAction({
          type: WsTypeEnum.chat,
          status: true,
        })
      );
    }, [chatId, dispatch]);

    const handleDisconnect = useCallback(() => {
      dispatch(
        wsConnectionStatusAction({
          type: WsTypeEnum.chat,
          status: false,
        })
      );
    }, [dispatch]);
    useEffect(() => {
      const socket = ChatWs.socketRef;
      const connection = socket?.connection;

      if (!connection) {
        handleDisconnect();
        return;
      }

      const unsubscribers: AnyFn[] = [];

      if (!connection?.active) {
        socket?.connect();
      } else if (connection.active) {
        handleConnected();
      }
      unsubscribers.push(
        socket?.onConnect(() => {
          onConnect && onConnect();
          handleConnected();
        })
      );

      if (onConnectError) {
        unsubscribers.push(
          socket.onConnectError(error => {
            onConnectError && onConnectError(error);

            handleDisconnect();
          })
        );
      }
      if (onTyping) {
        unsubscribers.push(ChatWs.onTyping.onSuccess(onTyping));
      }
      if (onJoin) {
        unsubscribers.push(ChatWs.onJoin.onSuccess(onJoin));
      }
      if (onLeave) {
        unsubscribers.push(ChatWs.onLeave.onSuccess(onLeave));
      }
      if (onSend) {
        unsubscribers.push(ChatWs.onSend.onSuccess(onSend));
      }

      return () => {
        unsubscribers.forEach(clb => clb());
      };
    }, [chatId, dispatch, onConnect, onConnectError, onJoin, onLeave, onSend, onTyping]);

    return null;
  }
);

// export const ChatWsInitializer = ({
//   onConnect,
//   onConnectError,
// }: {
//   onConnect?: () => void;
//   onConnectError?: (error: Error) => void;
// }) => {
//   const dispatch = useAppDispatch();
//   // const authState=useAuthSelector()
//
//   useEffect(() => {
//     const socket = ChatWs.socketRef;
//     const connection = socket?.connection;
//
//     if (!connection) {
//       dispatch(
//         wsConnectionStatusAction({
//           status: false,
//         })
//       );
//     } else if (!connection?.active) {
//       const unsubscribers = [
//         socket?.onConnect(() => {
//           console.log('Chat connected');
//           onConnect && onConnect();
//           dispatch(
//             wsConnectionStatusAction({
//               status: true,
//             })
//           );
//         }),
//         socket.onConnectError(error => {
//           console.error('Chat connect error');
//           console.error(error);
//           onConnectError && onConnectError(error);
//         }),
//       ];
//
//       socket?.connect();
//       return () => {
//         unsubscribers.forEach(clb => clb());
//       };
//     } else {
//       connection.active &&
//         dispatch(
//           wsConnectionStatusAction({
//             status: true,
//           })
//         );
//     }
//   }, [dispatch, onConnect, onConnectError]);
//
//   return null;
// };
