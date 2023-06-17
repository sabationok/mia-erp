import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsServiceHook, { usePermissionsSelector } from '../../redux/permissions/usePermissionsService.hook';
import { memo, useEffect, useMemo } from 'react';
import useAppParams from '../../hooks/useAppParams';
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

  const havePermission = useMemo(
    () => !!state.permission._id || (!!state.permission_token && isCurrentValid),
    [isCurrentValid, state.permission._id, state.permission_token]
  );

  useEffect(() => {
    if (!havePermission) {
      baseApi.interceptors.response.clear();
      return;
    }
    if (havePermission) {
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
  }, [clearCurrent, havePermission, isCurrentValid, state.permission?._id]);

  return havePermission ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
