import { IconIdType } from '../img/sprite';

export enum AppPagesEnum {
  companies = 'companies',
  transactions = 'transactions',
  orders = 'orders',
  refunds = 'refunds',
  supplement = 'supplement',
  products = 'products',
  dashboard = 'dashboard',
  storage = 'storage',
  manager = 'manager',
  admin = 'admin',
  notFound = 'notFound',
}

export type PagePathType = keyof typeof AppPagesEnum | AppPagesEnum;

export enum AppRoleName {}

export interface IAppPage<P = any> {
  title: string;
  path: P;
  iconId: IconIdType;
  actions?: string;
  moduleName?: P;
  appRole?: AppRoleName;
}

export const appPages: Record<string, IAppPage<PagePathType>> = {
  companies: { title: 'Компанії', path: 'companies', iconId: 'bank' },
  dashboard: { title: 'Дашборд', path: 'dashboard', iconId: 'bank' },
  transactions: { title: 'Рух коштів', path: 'transactions', iconId: 'cashFlow' },
  orders: { title: 'Замовлення', path: 'orders', iconId: 'assignmentOkOutlined' },
  refunds: { title: 'Повернення', path: 'refunds', iconId: 'assignmentBackOutlined' },
  supplement: { title: 'Постачання', path: 'supplement', iconId: 'assignmentInOutlined' },
  storage: { title: 'Склад', path: 'storage', iconId: 'storageOutlined' },
  products: { title: 'Продукти', path: 'products', iconId: 'storageOutlined' },
  manager: { title: 'Менеджер', path: 'manager', iconId: 'assignmentPersonOutlined' },
};

export const pages: IAppPage[] = Object.entries(appPages).map(([path, page]) => ({
  ...page,
  moduleName: path,
  path,
}));
