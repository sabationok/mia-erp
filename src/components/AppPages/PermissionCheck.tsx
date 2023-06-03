import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsServiceHook from '../../redux/permissions/usePermissionsService.hook';
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
  const { state, isCurrentValid, clearCurrent } = usePermissionsServiceHook({ permissionId });

  const havePermission = useMemo(
    () => !!state.permissionToken && isCurrentValid,
    [isCurrentValid, state.permissionToken]
  );

  useEffect(() => {
    if (!havePermission) {
      baseApi.interceptors.response.clear();
      return;
    }
    baseApi.interceptors.response.use(
      async value => {
        console.log('baseApi.interceptors.response fulfilled', value);
        return value;
      },
      async (e: AxiosError) => {
        console.error('baseApi.interceptors.response rejected', e);
        if (e.status === 409 && state.permission?._id) {
          console.error('Forbidden company');
          toast.error('Forbidden company action');
          clearCurrent();
        }
      }
    );

    return () => {
      baseApi.interceptors.response.clear();
      !isCurrentValid && clearCurrent();
    };
  }, [clearCurrent, havePermission, isCurrentValid, state.permission?._id]);

  return havePermission ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
