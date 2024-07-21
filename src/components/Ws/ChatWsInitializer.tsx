import { useEffect } from 'react';
import { wsConnectionStatusAction } from 'redux/chat/chat.slice';
import { useAppDispatch } from 'redux/store.store';
import { ChatWs } from 'socket';

export const ChatWsInitializer = ({
  onConnect,
  onConnectError,
}: {
  onConnect?: () => void;
  onConnectError?: (error: Error) => void;
}) => {
  const dispatch = useAppDispatch();
  // const authState=useAuthSelector()

  useEffect(() => {
    const socket = ChatWs.socketRef;
    const connection = socket?.connection;

    if (!connection) {
      dispatch(
        wsConnectionStatusAction({
          status: false,
        })
      );
    } else if (!connection?.active) {
      const unsubscribers = [
        socket?.onConnect(() => {
          console.log('Chat connected');
          onConnect && onConnect();
          dispatch(
            wsConnectionStatusAction({
              status: true,
            })
          );
        }),
        socket.onConnectError(error => {
          console.error('Chat connect error');
          console.error(error);
          onConnectError && onConnectError(error);
        }),
      ];

      socket?.connect();
      return () => {
        unsubscribers.forEach(clb => clb());
      };
    } else {
      connection.active &&
        dispatch(
          wsConnectionStatusAction({
            status: true,
          })
        );
    }
  }, [dispatch, onConnect, onConnectError]);

  return null;
};
