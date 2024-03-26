import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';
import { useEffect, useMemo } from 'react';
import { AxiosError } from 'axios';
import useAppAuthHook from '../../hooks/useAppAuth.hook';
import { ToastService } from '../../services';
import { ClientApi } from '../../api';

const PrivateRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { logOutUser } = useAppAuthHook();
  const { access_token } = useAuthSelector();

  const hasAccess = useMemo(() => {
    if (access_token) {
      ClientApi.setToken(access_token);
    } else {
      ClientApi.unsetToken();
    }

    return !!access_token;
  }, [access_token]);

  useEffect(() => {
    if (!hasAccess) {
      ClientApi.clientRef.interceptors.response.clear();
      ToastService.error('Unauthorized');
    }
    if (hasAccess) {
      return;
    }
    ClientApi.clientRef.interceptors.response.use(
      async value => value,
      async (e: AxiosError) => {
        console.log(e);
        if (e.status === 401) {
          console.error('PrivateRoute | access denied');
          ToastService.error('PrivateRoute | access denied');
          logOutUser().finally();
        }
      },
      {}
    );

    return () => {
      ClientApi.clientRef.interceptors.response.clear();
    };
  }, [hasAccess, logOutUser]);

  return hasAccess ? <Outlet /> : <Navigate to={redirectTo} replace={true} />;
};

export default PrivateRoute;
