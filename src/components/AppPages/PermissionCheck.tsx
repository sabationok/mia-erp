import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import { memo, useEffect, useMemo, useState } from 'react';
import useAppParams from '../../hooks/useAppParams.hook';
import { AxiosError } from 'axios';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import AppLoader from '../atoms/AppLoader';
import { isUndefined } from 'lodash';
import useLoadInitialAppDataHook from '../../hooks/useLoadInitialAppData.hook';
import { t } from '../../lang';
import { ToastService } from '../../services';
import { ClientApi } from '../../api';

type Props = {
  redirectTo?: string;
};
const PermissionCheck: React.FC<Props> = ({ redirectTo }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { permissionId } = useAppParams();
  const {
    permissions: { clearCurrent },
    auth: { logOutUser },
  } = useAppServiceProvider();

  const state = usePermissionsSelector();

  // const [loading, setLoading] = useState(false);

  const isValidPermissionId = useMemo(() => {
    const isValid = !isUndefined(permissionId) && state?.permission?._id === permissionId;
    if (isValid) {
      ClientApi.setP_Token(permissionId);
    } else {
      console.warn(
        'PermissionCheck ACCESS DENIED',
        ClientApi.clientRef?.defaults?.headers?.Permission || ClientApi.clientRef?.defaults?.headers
      );
      ClientApi.unSetP_Token();
    }
    return ClientApi.clientRef.defaults?.headers?.Permission === permissionId;
  }, [permissionId, state.permission._id]);

  const hasPermission = useMemo(() => !!state.permission._id, [state.permission._id]);

  const onAppLoadFinish = () => setIsLoaded(true);

  useLoadInitialAppDataHook({
    onLoading: setLoading,
    onSuccess: onAppLoadFinish,
  });

  useEffect(() => {
    if (!isValidPermissionId) {
      navigate('/');
    }
  }, [isValidPermissionId, navigate]);

  useEffect(() => {
    if (!hasPermission) {
      ClientApi.clientRef.interceptors.response.clear();
    } else {
      ClientApi.clientRef.interceptors.response.use(
        value => value,
        (e: AxiosError) => {
          if (e.status === 409) {
            console.log(e);
            ToastService.error('Forbidden company action');
            clearCurrent();
          }
          if (e.status === 401) {
            console.log(e);
            ToastService.error('Auth failed');
            logOutUser();
          }
          throw e;
        },
        {}
      );
    }

    return () => {
      ClientApi.clientRef.interceptors.response.clear();
      // clearCurrent();
    };
  }, [clearCurrent, hasPermission, logOutUser, permissionId]);

  if (loading || !isLoaded) {
    return <AppLoader isLoading comment={t('Permission check, please wait')} />;
  }

  return isValidPermissionId ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
