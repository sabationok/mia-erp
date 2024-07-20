import { useEffect } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import { WsClient } from '../../socket';

export const WsConnector = () => {
  const authState = useAuthSelector();

  useEffect(() => {
    if (authState.access_token) {
      WsClient.authorize({ access_token: authState.access_token });
    } else {
      WsClient.unAuthorize();
    }
  }, [authState.access_token]);

  return null;
};
