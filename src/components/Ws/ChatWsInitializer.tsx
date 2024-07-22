import React, { useEffect } from 'react';
import { wsConnectionStatusAction } from 'redux/chat/chat.slice';
import { useAppDispatch } from 'redux/store.store';
import { ChatServerEvents, ChatWs } from 'socket';
import { ApiHeaders, ChatMessagesApiTypes } from '../../api';
import { ChatEntity } from '../../types/chat/chat.types';

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

    useEffect(() => {
      if (permissionId) {
        // ChatApi.setHeader(ApiHeaders.p_token, permissionId);
        ChatWs.socketRef.setHeader(ApiHeaders.p_token, permissionId);
      }
    }, [permissionId]);

    useEffect(() => {
      const socket = ChatWs.socketRef;
      const connection = socket?.connection;

      if (!connection) {
        dispatch(
          wsConnectionStatusAction({
            status: false,
          })
        );
        return;
      }

      if (!connection?.active) {
        const unsubscribers = [
          socket?.onConnect(() => {
            console.log('Chat connected');
            onConnect && onConnect();
            if (chatId) {
              ChatWs.handleJoin({ data: { chatId } });
            }

            dispatch(
              wsConnectionStatusAction({
                status: true,
              })
            );
          }),
        ];
        if (onConnectError) {
          unsubscribers.push(socket.onConnectError(onConnectError));
        }
        if (onTyping) {
          unsubscribers.push(ChatWs.onTyping(onTyping));
        }
        if (onJoin) {
          unsubscribers.push(ChatWs.onJoin.onSuccess(onJoin));
        }
        if (onLeave) {
          unsubscribers.push(ChatWs.onLeave.onSuccess(onLeave));
        }

        socket?.connect();
        return () => {
          unsubscribers.forEach(clb => clb());
        };
      } else if (connection.active) {
        // console.log('chat is active', connection);
        if (chatId) {
          ChatWs.handleJoin({ data: { chatId } });
        }

        dispatch(
          wsConnectionStatusAction({
            status: true,
          })
        );
      }

      // eslint-disable-next-line
    }, [dispatch]);

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
