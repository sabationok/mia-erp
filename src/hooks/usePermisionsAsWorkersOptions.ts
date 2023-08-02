import { useMemo } from 'react';
import { usePermissionsSelector } from './usePermissionsService.hook';
import { IBaseDirItem } from '../components/Directories/dir.types';

const usePermissionsAsDirItemOptions = () => {
  const permissions = usePermissionsSelector().permissions;
  return useMemo((): Partial<IBaseDirItem>[] => {
    return permissions.map(({ user }) => ({ _id: user?._id, label: `${user?.name}` }));
  }, [permissions]);
};
export default usePermissionsAsDirItemOptions;
