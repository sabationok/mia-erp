import { t } from '../../lang';

export * as AppPages from './pages';

export interface BaseAppPageProps {
  path: PagePathType;
}

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
  warehouses = 'warehouses',
  notFound = 'notFound',
  documentsFlow = 'documentsFlow',
  priceLists = 'priceLists',
  director = 'director',
  customers = 'customers',
  counterparties = 'counterparties',
}

export enum AppRoleName {}

export interface IAppPage<P = any> {
  path: P;
  hasSubMenu?: boolean;
  subMenuKey?: AppPagesEnum;
  title?: string;
  iconId: string;
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
  products: { path: 'products', iconId: 'storageOutlined' },
  warehouses: { path: 'warehouses', iconId: 'storageOutlined', subMenuKey: AppPagesEnum.warehouses },
  priceLists: { path: 'priceLists', iconId: 'assignment', subMenuKey: AppPagesEnum.priceLists },
  manager: { path: 'manager', iconId: 'assignmentPersonOutlined' },
  customers: { path: 'customers', iconId: 'assignmentPersonOutlined' },
  // director: { path: 'director', iconId: 'assignmentPersonOutlined' },
};

export type PagePathType = keyof typeof AppPagesEnum | AppPagesEnum;

export const pages: IAppPage[] = Object.entries(appPages).map(([path, page]) => {
  return {
    ...page,
    title: t(page.path),
    moduleName: path,
    path,
  };
});

export function getAllAccessKeys() {
  return Object.entries(pages).map(([path, page]) => page.path);
}
