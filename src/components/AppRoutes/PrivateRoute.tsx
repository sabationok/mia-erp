import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSelector } from 'redux/selectors.store';
import { toast } from 'react-toastify';
import { useEffect, useMemo } from 'react';
import baseApi, { token } from '../../api/baseApi';
import { AxiosError } from 'axios';
import useAppAuthHook from '../../hooks/useAppAuth.hook';

const PrivateRoute: React.FC<{ redirectTo: string }> = ({ redirectTo }) => {
  const { logOutUser } = useAppAuthHook();
  const { access_token } = useAuthSelector();

  const hasAccess = useMemo(() => {
    if (access_token) {
      token.set(access_token);
    } else {
      token.unset();
    }

    return !!access_token;
  }, [access_token]);

  useEffect(() => {
    if (!hasAccess) {
      baseApi.interceptors.response.clear();
      toast.error('Unauthorized');
    }
    if (hasAccess) {
      return;
    }
    baseApi.interceptors.response.use(
      async value => value,
      async (e: AxiosError) => {
        console.log(e);
        if (e.status === 401) {
          console.error('PrivateRoute | access denied');
          toast.error('PrivateRoute | access denied');
          logOutUser().finally();
        }
      },
      {}
    );

    return () => {
      baseApi.interceptors.response.clear();
    };
  }, [hasAccess, logOutUser]);

  return hasAccess ? <Outlet /> : <Navigate to={redirectTo} replace={true} />;
};

export default PrivateRoute;
