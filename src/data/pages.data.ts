import { useAuthSelector } from '../redux/selectors.store';
import { IconIdType } from '../img/sprite';
import { useMemo } from 'react';

export type PagePathType =
  'home'
  | 'transactions'
  | 'orders'
  | 'refunds'
  | 'supplement'
  | 'storage'
  | 'manager'
  | 'admin'

export interface IAppPage {
  title: string;
  path: PagePathType;
  iconId: IconIdType;
  actions?: string;
  permissionName?: string;
}


export const appPages: Record<string, IAppPage> = {
  home: { title: 'Головна', path: 'home', iconId: 'bank' },
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

export const useAppPages = () => {
  const { permission } = useAuthSelector();

  return useMemo(() => pages.filter(page => {
    if (page.path === 'home') return true;
    if (permission.role.accessKeys?.includes(page.path)) return true;
    return (permission.user._id === permission.company.owner?._id) && (page.path === 'admin');
  }), [permission.company.owner?._id, permission.role.accessKeys, permission.user._id]);
};
