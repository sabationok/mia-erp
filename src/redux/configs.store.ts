import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

export const persistorConfigs = {
  auth: {
    key: 'auth',
    storage,
    whitelist: ['access_token', 'isLoggedIn'],
  },
  permissions: {
    key: 'permission',
    storage: storageSession,
    whitelist: ['permission', 'permission_token'],
  },
  appSettings: {
    key: 'appSettings',
    storage,
    whitelist: ['isDarkMode'],
  },
  pageSettings: {
    key: 'appPage',
    storage,
    whitelist: ['pageGrid'],
  },
  categories: {
    key: 'categories',
    storage,
    whitelist: ['categories'],
  },
  counts: {
    key: 'counts',
    storage,
    whitelist: ['counts'],
  },
  directories: {
    key: 'directories',
    storage,
    whitelist: ['directories'],
  },
  transactions: {
    key: 'transactions',
    storage,
    whitelist: ['transactions'],
  },
  customRoles: {
    key: 'customRoles',
    storage,
    whitelist: ['customRoles'],
  },
  roles: {
    key: 'roles',
    storage,
    whitelist: ['roles'],
  },
};
