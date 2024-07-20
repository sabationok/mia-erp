import { useEffect } from 'react';
import { wsConnectionStatusAction } from 'redux/chat/chat.slice';
import { useAppDispatch } from 'redux/store.store';
import { ChatWs } from 'socket';

export const ChatWsInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = ChatWs.socketRef;
    const connection = socket?.connection;

    if (!connection) {
      dispatch(
        wsConnectionStatusAction({
          status: false,
        })
      );
    }

    if (!connection?.active) {
      const unsubscribers = [
        socket?.onConnect(() => {
          console.log('Chat connected');
          connection.id &&
            dispatch(
              wsConnectionStatusAction({
                status: true,
              })
            );
        }),
        socket.onConnectError(error => {
          console.error('Chat connect error');
          console.error(error);
        }),
      ];

      socket?.connect();
      return () => {
        unsubscribers.forEach(clb => clb());
      };
    } else {
      connection.id &&
        dispatch(
          wsConnectionStatusAction({
            status: true,
          })
        );
    }

    // eslint-disable-next-line
  }, [dispatch]);

  return null;
};
