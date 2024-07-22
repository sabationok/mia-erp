import { useEffect } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import { ChatWs, WsClient } from '../../socket';
import { useAppParams } from '../../hooks';
import { ApiHeaders } from '../../api';

export const WsConnector = () => {
  const authState = useAuthSelector();
  const permissionId = useAppParams().permissionId;
  // const permissionId = usePermissionsSelector()?.permission?._id;

  useEffect(() => {
    if (permissionId) {
      ChatWs.socketRef.setHeader(ApiHeaders.p_token, permissionId);
    } else {
      ChatWs.socketRef.removeHeader(ApiHeaders.p_token);
    }
  }, [permissionId]);

  useEffect(() => {
    if (authState.access_token) {
      WsClient.authorize({ authorization: authState.access_token, 'p-token': permissionId });
    } else {
      WsClient.unAuthorize();
    }
  }, [authState.access_token, permissionId]);

  return null;
};
