import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import { memo, useEffect, useMemo, useState } from 'react';
import useAppParams from '../../hooks/useAppParams.hook';
import baseApi, { permissionToken } from '../../api/baseApi';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';
import AppLoader from '../atoms/AppLoader';
import { isUndefined } from 'lodash';
import useLoadInitialAppDataHook from '../../hooks/useLoadInitialAppData.hook';
import { t } from '../../lang';

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
      permissionToken.set(permissionId);
    } else {
      console.warn(
        'PermissionCheck ACCESS DENIED',
        baseApi?.defaults?.headers?.Permission || baseApi?.defaults?.headers
      );
      permissionToken.unset();
    }
    return baseApi.defaults?.headers?.Permission === permissionId;
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
      baseApi.interceptors.response.clear();
    } else {
      baseApi.interceptors.response.use(
        async value => value,
        async (e: AxiosError) => {
          if (e.status === 409) {
            console.log(e);
            toast.error('Forbidden company action');
            clearCurrent();
          }
          if (e.status === 401) {
            console.log(e);
            toast.error('Auth failed');
            logOutUser();
          }
          throw e;
        },
        {}
      );
    }

    return () => {
      baseApi.interceptors.response.clear();
      // clearCurrent();
    };
  }, [clearCurrent, hasPermission, logOutUser, permissionId]);

  if (loading || !isLoaded) {
    return <AppLoader isLoading comment={t('Permission check, please wait')} />;
  }

  return isValidPermissionId ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
