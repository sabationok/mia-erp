import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

export const persistorConfigs = {
  auth: {
    key: 'accessToken',
    storage,
    whitelist: ['accessToken', 'isLoggedIn'],
  },
  permissions: {
    key: 'permissions',
    storage: storageSession,
    whitelist: ['permission'],
  },
  appSettings: {
    key: 'appSettings',
    storage,
    whitelist: ['isDarkMode', 'appTheme'],
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
  transactions: {
    key: 'transactions',
    storage,
    whitelist: ['transactions'],
  },
  roles: {
    key: 'roles',
    storage,
    whitelist: ['roles'],
  },
};
