import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsServiceHook from '../../redux/permissions/usePermissionsService.hook';
import { memo, useEffect, useMemo } from 'react';
import useAppParams from '../../hooks/useAppParams';

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};
const PermissionCheck: React.FC<Props> = ({ children, redirectTo }) => {
  const { permissionId } = useAppParams();
  const { state } = usePermissionsServiceHook({ permissionId });

  const isActive = useMemo(() => !!state.permissionToken, [state.permissionToken]);

  useEffect(() => {
    console.log('PermissionCheck', state);
  }, [state]);

  return isActive ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
