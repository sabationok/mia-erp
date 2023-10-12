import { useMemo } from 'react';
import { usePermissionsSelector } from './usePermissionsService.hook';
import { IAppPage, pages } from '../components/AppPages';
import { t } from '../lang';

const useAppPages = ({ permissionId }: { permissionId?: string }) => {
  const { permission } = usePermissionsSelector();

  return useMemo((): IAppPage[] => {
    const isCompanyValid = permission?._id === permissionId;

    const appPages: IAppPage[] = [{ title: t('Main'), path: 'companies', iconId: 'bank' }];
    if (isCompanyValid) {
      const availablePages = pages
        // .filter(page => {
        //   if (permission?.role?.accessKeys?.includes(page.path)) return true;
        //   return permission?.user?._id === permission?.company?.owner?._id && page.path === 'admin';
        // })
        .map(page => ({ ...page, path: `/app/${permissionId}/${page?.path}` }));
      return [...availablePages];
    }

    return appPages;
  }, [permission?._id, permissionId]);
};

export default useAppPages;
