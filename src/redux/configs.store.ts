import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

export const persistorConfigs = {
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
    whitelist: ['isDarkMode', 'appTheme'],
  },
  pageSettings: {
    key: 'appPage',
    storage: storageSession,
    whitelist: ['pageGrid'],
  },
  categories: {
    key: 'categories',
    storage: storageSession,
    whitelist: ['categories'],
  },
  counts: {
    key: 'counts',
    storage: storageSession,
    whitelist: ['counts'],
  },
  directories: {
    key: 'directories',
    storage: storageSession,
    whitelist: ['directories'],
  },
  transactions: {
    key: 'transactions',
    storage: storageSession,
    whitelist: ['transactions'],
  },
  products: {
    key: 'products',
    storage: storageSession,
    whitelist: ['products'],
  },
  orders: {
    key: 'orders',
    storage: storageSession,
    whitelist: ['orders'],
  },
  refunds: {
    key: 'refunds',
    storage: storageSession,
    whitelist: ['refunds'],
  },
  warehouses: {
    key: 'warehouses',
    storage: storageSession,
    whitelist: ['warehouses'],
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
