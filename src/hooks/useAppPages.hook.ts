import { usePermissionsSelector } from '../redux/permissions/usePermissionsService.hook';
import { useMemo } from 'react';
import { pages } from '../data';
import { IAppPage } from '../data/pages.data';

const useAppPages = ({ permissionId }: { permissionId?: string }) => {
  const { permission } = usePermissionsSelector();
  
  return useMemo((): IAppPage[] => {
    const isCompanyValid = permission?._id === permissionId;

    if (isCompanyValid) {
      return pages
        .filter(page => {
          if (permission?.role?.accessKeys?.includes(page.path)) return true;
          return permission?.user?._id === permission?.company?.owner?._id && page.path === 'admin';
        })
        .map(page => ({ ...page, path: `/app/${permissionId}/${page?.path}` }));
    }

    return [{ title: 'Головна', path: 'home', iconId: 'bank' }];
  }, [
    permission?._id,
    permission?.company?.owner?._id,
    permission?.role?.accessKeys,
    permission?.user?._id,
    permissionId,
  ]);
};

export default useAppPages;
