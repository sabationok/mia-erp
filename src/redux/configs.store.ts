import { PersistConfig, Storage, WebStorage } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import { AppRootState } from './reduxTypes.types';

export type AppRootStateKey = keyof AppRootState;

type PersistorConfig<K extends string, S = any> = {
  key: K;
  storage: Storage | WebStorage;
  blacklist?: Array<keyof S>;
  whitelist?: Array<keyof S>;
} & PersistConfig<S>;

type AppPersistConfigs = {
  [key in AppRootStateKey]?: PersistorConfig<key, AppRootState[key] extends any ? AppRootState[key] : never>;
};

export const persistorConfigs: AppPersistConfigs = {
  auth: {
    key: 'auth',
    storage,
    whitelist: ['access_token', 'refresh_token', 'user', 'isLoggedIn'],
  },
  cart: {
    key: 'cart',
    storage: storageSession,
  },
  carts: {
    key: 'carts',
    storage: storageSession,
    whitelist: ['dataMap', 'ids', 'recommends', 'ids'],
  },
  permissions: {
    key: 'permissions',
    storage: storageSession,
    whitelist: ['permissions', 'permission', 'permission_token'],
  },
  appSettings: {
    key: 'appSettings',
    storage,
    whitelist: ['isDarkMode', 'appTheme', 'isLoaded', 'accentColor'],
  },
  appPage: {
    key: 'appPage',
    storage: storageSession,
    whitelist: ['pageGrid'],
  },
  tags: {
    key: 'tags',
    storage: storageSession,
    whitelist: ['list', 'listsMap'],
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
      'dataMap',
      'skuKeysMap',
      'list',
      'properties',
      // 'variationsKeysMap',
      // 'variationsMap',
      'propertiesKeysMap',
      'propertiesDataMap',
      'propertiesByTypeKeysMap',
    ],
  },
  discounts: {
    key: 'discounts',
    storage: storageSession,
    whitelist: ['list', 'keysMap', 'dataMap'],
  },

  orders: {
    key: 'orders',
    storage: storageSession,
    whitelist: ['orders', 'currentOrder', 'ordersGroupFormData'],
  },
  invoices: {
    key: 'invoices',
    storage: storageSession,
    whitelist: ['invoices', 'methods'],
  },
  payments: {
    key: 'payments',
    storage: storageSession,
    whitelist: ['payments', 'methods'],
  },
  shipments: {
    key: 'shipments',
    storage: storageSession,
    whitelist: ['shipments', 'methods'],
  },
  deliveries: {
    key: 'deliveries',
    storage: storageSession,
    whitelist: ['deliveries', 'methods'],
  },
  returns: {
    key: 'returns',
    storage: storageSession,
    whitelist: ['returns', 'currentRefund'],
  },
  connections: {
    key: 'connections',
    storage: storageSession,
    whitelist: ['extList'],
  },
  warehouses: {
    key: 'warehouses',
    storage: storageSession,
    whitelist: ['list', 'dataMap', 'keysMap'],
  },
  customers: {
    key: 'customers',
    storage: storageSession,
    whitelist: ['customers'],
  },
  priceManagement: {
    key: 'priceManagement',
    storage: storageSession,
    whitelist: ['lists', 'dataMap', 'keysMap'],
  },
  customRoles: {
    key: 'customRoles',
    storage: storageSession,
    whitelist: ['customRoles'],
  },
};
