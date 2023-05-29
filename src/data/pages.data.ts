import { useAuthSelector } from '../redux/selectors.store';
import { IconIdType } from '../img/sprite';
import { useMemo } from 'react';

export type PagePathType =
  | 'companies'
  | 'transactions'
  | 'orders'
  | 'refunds'
  | 'supplement'
  | 'storage'
  | 'manager'
  | 'admin';

export interface IAppPage<P = any> {
  title: string;
  path: P;
  iconId: IconIdType;
  actions?: string;
  permissionName?: string;
}

export const appPages: Record<string, IAppPage<PagePathType>> = {
  home: { title: 'Компанії', path: 'companies', iconId: 'bank' },
  transactions: { title: 'Рух коштів', path: 'transactions', iconId: 'cashFlow', permissionName: 'cashFlow' },
  orders: { title: 'Замовлення', path: 'orders', iconId: 'assignmentOkOutlined', permissionName: 'orders' },
  refunds: { title: 'Повернення', path: 'refunds', iconId: 'assignmentBackOutlined', permissionName: 'refunds' },
  supplement: { title: 'Постачання', path: 'supplement', iconId: 'assignmentInOutlined', permissionName: 'supplement' },
  storage: { title: 'Склад', path: 'storage', iconId: 'storageOutlined', permissionName: 'storage' },
  manager: { title: 'Менеджер', path: 'manager', iconId: 'assignmentPersonOutlined', permissionName: 'manager' },
  admin: { title: 'Адмін', path: 'admin', iconId: 'admin', permissionName: 'owner' },
};

export const pages: IAppPage[] = [
  appPages.home,
  appPages.transactions,
  appPages.orders,
  appPages.refunds,
  appPages.supplement,
  appPages.storage,
  appPages.manager,
  appPages.admin,
];

export const useAppPages = ({ companyId }: { companyId?: string }) => {
  const { permission } = useAuthSelector();

  // const pagesCorp = useMemo(() => {
  //   let res = pages.map(page => ({ ...page, path: `/app/${companyId}/${page?.path}` }));
  //   console.log(res);
  //   return res;
  // }, [companyId]);

  return useMemo(() => {
    const isCompanyValid = permission.company._id === companyId;
    let res: IAppPage[] = [];
    if (isCompanyValid) {
      res = pages
        .filter(page => {
          if (permission.role.accessKeys?.includes(page.path)) return true;
          return permission.user._id === permission.company.owner?._id && page.path === 'admin';
        })
        .map(page => ({ ...page, path: `/app/${companyId}/${page?.path}` }));
    }

    if (!isCompanyValid) {
      res = [{ title: 'Головна', path: 'home', iconId: 'bank' }];
    }

    return res;
  }, [
    companyId,
    permission.company._id,
    permission.company.owner?._id,
    permission.role.accessKeys,
    permission.user._id,
  ]);
};
