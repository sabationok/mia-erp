import { useEffect } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import { WsClient } from '../../socket';
import { useAppParams } from '../../hooks';

export const WsConnector = () => {
  const authState = useAuthSelector();
  const permissionId = useAppParams().permissionId;
  useEffect(() => {
    if (authState.access_token) {
      WsClient.authorize({ authorization: authState.access_token, 'p-token': permissionId });
    } else {
      WsClient.unAuthorize();
    }
  }, [authState.access_token, permissionId]);

  return null;
};
