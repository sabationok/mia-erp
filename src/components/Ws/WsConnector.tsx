import { useEffect } from 'react';
import { useAuthSelector } from '../../redux/selectors.store';
import { ChatWs, WsClient } from '../../socket';
import { useAppParams } from '../../hooks';
import { useAppDispatch } from '../../redux/store.store';
import { wsConnectionStatusAction, WsTypeEnum } from '../../redux/chat/chat.slice';
import { ApiHeaders } from '../../api';

export const WsConnector = () => {
  const authState = useAuthSelector();
  const permissionId = useAppParams().permissionId;
  // const permissionId = usePermissionsSelector()?.permission?._id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (permissionId) {
      ChatWs.socketRef.connect({
        onConnect: () => {
          dispatch(wsConnectionStatusAction({ status: true, type: WsTypeEnum.chat }));
        },
        onConnectError: () => {
          dispatch(wsConnectionStatusAction({ status: false, type: WsTypeEnum.chat }));
        },
      });
    } else {
      ChatWs.socketRef.disconnect(() => {});
    }
  }, [dispatch, permissionId]);

  useEffect(() => {
    if (authState.access_token && permissionId) {
      WsClient.authorize({ authorization: authState.access_token, [ApiHeaders.P_Token]: permissionId });
    } else {
      WsClient.unAuthorize();
    }
  }, [authState.access_token, permissionId]);

  return null;
};
