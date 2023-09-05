import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsServiceHook, { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import { memo, useEffect, useMemo, useState } from 'react';
import useAppParams from '../../hooks/useAppParams.hook';
import baseApi, { permissionToken } from '../../api/baseApi';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import AppLoader from '../atoms/AppLoader';
import { isUndefined } from 'lodash';

type Props = {
  redirectTo?: string;
};
const PermissionCheck: React.FC<Props> = ({ redirectTo }) => {
  const { permissionId } = useAppParams();
  const service = useAppServiceProvider()[ServiceName.permissions];
  const state = usePermissionsSelector();

  const [loading, setLoading] = useState(false);

  const { clearCurrent } = usePermissionsServiceHook({ permissionId });

  const isValidPermissionId = useMemo(() => {
    const isValid = !isUndefined(permissionId) && state.permission._id === permissionId;
    if (isValid) {
      permissionToken.set(permissionId);

      console.log('PermissionCheck isValidPermissionId', '==//==', baseApi.defaults.headers.Permission);
    } else {
      permissionToken.unset();
    }
    return baseApi.defaults.headers.Permission === permissionId;
  }, [permissionId, state.permission._id]);

  const hasPermission = useMemo(() => !!state.permission._id, [state.permission._id]);

  useEffect(() => {
    if (!hasPermission) {
      baseApi.interceptors.response.clear();
    }
    if (hasPermission) {
      return;
    }
    baseApi.interceptors.response.use(
      async value => value,
      async (e: AxiosError) => {
        console.log(e);
        if (e.status === 409) {
          console.error('Forbidden company');
          toast.error('Forbidden company action');
          clearCurrent();
        }
      },
      {}
    );

    return () => {
      baseApi.interceptors.response.clear();
      clearCurrent();
    };
  }, [clearCurrent, hasPermission, permissionId, service]);

  if (state.isLoading) {
    return <AppLoader isLoading comment={'Permission check. Please wait.'} />;
  }

  return isValidPermissionId ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
