import { Navigate, Outlet } from 'react-router-dom';
import usePermissionsServiceHook from '../../redux/permissions/usePermissionsService.hook';
import { memo } from 'react';
import useAppParams from '../../hooks/useAppParams';

type Props = {
  children?: React.ReactNode;
  redirectTo?: string;
};
const PermissionCheck: React.FC<Props> = ({ children, redirectTo }) => {
  const { permissionId, ...others } = useAppParams();
  console.log('PermissionCheck', { permissionId, ...others });
  const { isCurrentValid } = usePermissionsServiceHook({ permissionId });

  return isCurrentValid ? <Outlet /> : <Navigate to={redirectTo || '/app'} />;
};
export default memo(PermissionCheck);
