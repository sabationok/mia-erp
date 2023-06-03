import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsServiceHook from '../../redux/permissions/usePermissionsService.hook';
import { memo, useEffect, useMemo } from 'react';
import useAppParams from '../../hooks/useAppParams';
import baseApi, { useBaseURLWithPermission } from '../../api/baseApi';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Props = {
  redirectTo?: string;
};
const PermissionCheck: React.FC<Props> = ({ redirectTo }) => {
  const { permissionId } = useAppParams();
  const { state, isCurrentValid, clearCurrent } = usePermissionsServiceHook({ permissionId });

  useBaseURLWithPermission(state.permission?._id);

  const havePermission = useMemo(
    () => !!state.permissionToken && isCurrentValid,
    [isCurrentValid, state.permissionToken]
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
