import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';
import { WsConnector } from '../Ws/WsConnector';
import React, { useLayoutEffect } from 'react';
import { ClientApi } from '../../api';
import { useAppDispatch } from '../../redux/store.store';
import useAppAuthHook from '../../hooks/useAppAuth.hook';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { setAccessTokensAction } from '../../redux/auth/auth.slice';

const PrivateRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { access_token } = useAuthSelector();

  const dispatch = useAppDispatch();
  const { logOutUser } = useAppAuthHook();
  const { permissions: pSrv } = useAppServiceProvider();

  useLayoutEffect(() => {
    const unsubscribes: (() => void)[] = [];

    if (access_token) {
      ClientApi.setToken(access_token);

      unsubscribes.push(
        ClientApi.onUnauthorized(error => {
          console.error('[onUnauthorized] ==========================================', error);
          ClientApi.unsetToken();
          logOutUser({});
        }),
        ClientApi.onRefreshToken(data => {
          console.log('[onRefreshToken] ==========================================');
          dispatch(setAccessTokensAction(data));
        })
      );

      return () => {
        unsubscribes.forEach(off => off());
      };
    } else {
      ClientApi.unsetToken();
      return () => {
        unsubscribes.forEach(off => off());
      };
    }
  }, [access_token, dispatch, logOutUser, pSrv]);

  return !!access_token ? (
    <>
      <WsConnector />

      <Outlet />
    </>
  ) : (
    <Navigate to={redirectTo} replace={true} />
  );
};

export default PrivateRoute;
