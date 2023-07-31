import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsServiceHook, { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import { memo, useEffect, useMemo } from 'react';
import useAppParams from '../../hooks/useAppParams.hook';
import baseApi from '../../api/baseApi';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Props = {
  redirectTo?: string;
};
const PermissionCheck: React.FC<Props> = ({ redirectTo }) => {
  const { permissionId } = useAppParams();
  const state = usePermissionsSelector();
  const { isCurrentValid, clearCurrent } = usePermissionsServiceHook({ permissionId });

  const hasPermission = useMemo(
    () => !!state.permission._id || (!!state.permission_token && isCurrentValid),
    [isCurrentValid, state.permission._id, state.permission_token]
  );

  useEffect(() => {
    if (!hasPermission) {
      baseApi.interceptors.response.clear();
      return;
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
      !isCurrentValid && clearCurrent();
    };
  }, [clearCurrent, hasPermission, isCurrentValid, state.permission?._id]);

  useEffect(() => {
    if (hasPermission) {
      console.log('hasPermission useEffect', hasPermission);
    }
  }, [hasPermission]);

  return hasPermission ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
