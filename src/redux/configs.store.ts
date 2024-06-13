import { PersistConfig, Storage, WebStorage } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { AppModuleName } from './reduxTypes.types';

type Key = keyof typeof AppModuleName | 'pageSettings' | string;
export const persistorConfigs: Record<
  Key,
  {
    key: Key;
    storage: Storage | WebStorage;
  } & PersistConfig<any>
> = {
  cart: {
    key: 'cart',
    storage,
  },
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
  tags: {
    key: 'tags',
    storage: storageSession,
    whitelist: ['list'],
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
  offers: {
    key: 'offers',
    storage: storageSession,
    whitelist: [
      'properties',
      'keysMap',
      'dataMap',
      'skuKeysMap',
      'list',
      'properties',
      'variationsKeysMap',
      'variationsMap',
      'propertiesKeysMap',
      'propertiesDataMap',
      'propertiesByTypeKeysMap',
    ],
  },
  discounts: {
    key: 'offers',
    storage: storageSession,
    whitelist: ['list', 'keysMap', 'dataMap'],
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
