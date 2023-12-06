import { Storage, WebStorage } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { AppModuleName } from './reduxTypes.types';

type Key = keyof typeof AppModuleName | string;
export const persistorConfigs: Record<
  Key,
  {
    key: Key;
    storage: Storage | WebStorage;
    whitelist: string[];
  }
> = {
  auth: {
    key: 'auth',
    storage,
    whitelist: ['access_token', 'user', 'isLogged'],
  },
  permissions: {
    key: 'permission',
    storage: storageSession,
    whitelist: ['permission', 'permission_token'],
  },
  appSettings: {
    key: 'appSettings',
    storage,
    whitelist: ['isDarkMode', 'appTheme', 'isLoaded'],
  },
  pageSettings: {
    key: 'appPage',
    storage: storageSession,
    whitelist: ['pageGrid'],
  },
  // categories: {
  //   key: 'categories',
  //   storage: storageSession,
  //   whitelist: ['categories'],
  // },
  // counts: {
  //   key: 'counts',
  //   storage: storageSession,
  //   whitelist: ['counts'],
  // },
  directories: {
    key: 'directories',
    storage: storageSession,
    whitelist: ['directories'],
  },
  finances: {
    key: 'finances',
    storage: storageSession,
    whitelist: ['transactions'],
  },
  products: {
    key: 'products',
    storage: storageSession,
    whitelist: ['products', 'currentProduct', 'properties'],
  },
  orders: {
    key: 'orders',
    storage: storageSession,
    whitelist: ['orders', 'currentOrder', 'currentGroup', 'ordersGroupFormData'],
  },
  invoices: {
    key: 'invoices',
    storage: storageSession,
    whitelist: ['invoices', 'currentInvoice', 'methods'],
  },
  payments: {
    key: 'payments',
    storage: storageSession,
    whitelist: ['payments', 'currentPayment', 'methods'],
  },
  shipments: {
    key: 'shipments',
    storage: storageSession,
    whitelist: ['shipments', 'methods', 'currentShipment'],
  },
  deliveries: {
    key: 'deliveries',
    storage: storageSession,
    whitelist: ['deliveries', 'methods'],
  },
  refunds: {
    key: 'refunds',
    storage: storageSession,
    whitelist: ['refunds', 'currentRefund'],
  },
  integrations: {
    key: 'integrations',
    storage: storageSession,
    whitelist: ['extList'],
  },
  warehouses: {
    key: 'warehouses',
    storage: storageSession,
    whitelist: ['warehouses'],
  },
  customers: {
    key: 'customers',
    storage: storageSession,
    whitelist: ['customers'],
  },
  priceLists: {
    key: 'priceLists',
    storage: storageSession,
    whitelist: ['priceLists'],
  },
  customRoles: {
    key: 'customRoles',
    storage: storageSession,
    whitelist: ['customRoles'],
  },
  roles: {
    key: 'roles',
    storage: storageSession,
    whitelist: ['roles'],
  },
};
