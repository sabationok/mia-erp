import { IconIdType } from '../img/sprite';
import t, { LangTextKey } from '../lang';

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
  documentsFlow = 'documentsFlow',
  priceManagement = 'priceManagement',
  director = 'director',
}

export type PagePathType = keyof typeof AppPagesEnum | AppPagesEnum;

export enum AppRoleName {}

export interface IAppPage<P = any> {
  path: P;
  title?: string;
  iconId: IconIdType;
  actions?: string;
  moduleName?: P;
  appRole?: AppRoleName;
}

export const appPages: Record<string, IAppPage<PagePathType>> = {
  companies: { path: 'companies', iconId: 'bank' },
  dashboard: { path: 'dashboard', iconId: 'bank' },
  transactions: { path: 'transactions', iconId: 'cashFlow' },
  documentsFlow: { path: 'documentsFlow', iconId: 'assignment' },
  orders: { path: 'orders', iconId: 'assignmentOkOutlined' },
  refunds: { path: 'refunds', iconId: 'assignmentBackOutlined' },
  supplement: { path: 'supplement', iconId: 'assignmentInOutlined' },
  storage: { path: 'storage', iconId: 'storageOutlined' },
  products: { path: 'products', iconId: 'storageOutlined' },
  priceManagement: { path: 'priceManagement', iconId: 'assignment' },
  manager: { path: 'manager', iconId: 'assignmentPersonOutlined' },
  director: { path: 'director', iconId: 'assignmentPersonOutlined' },
};

export const pages: IAppPage[] = Object.entries(appPages).map(([path, page]) => ({
  ...page,
  title: t(page.path as LangTextKey),
  moduleName: path,
  path,
}));
