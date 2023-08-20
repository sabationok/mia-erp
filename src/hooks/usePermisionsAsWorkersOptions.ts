import { useMemo } from 'react';
import { usePermissionsSelector } from './usePermissionsService.hook';
import { PermissionStatus } from '../redux/permissions/permissions.types';

const usePermissionsAsDirItemOptions = () => {
  const users = usePermissionsSelector().users;

  return useMemo(() => {
    return users
      .filter(el => el.status === PermissionStatus.ACCEPTED)
      .map(({ user, email, _id }) => ({ _id, label: `${user?.name || ''} ${email || ''}` }));
  }, [users]);
};
export default usePermissionsAsDirItemOptions;
