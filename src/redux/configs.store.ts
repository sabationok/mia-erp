import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';

export const presistorConfigs = {
  auth: {
    key: 'accessToken',
    storage,
    whitelist: ['accessToken'],
  },
  appSettings: {
    key: 'appSettings',
    storage,
    whitelist: ['isDarkMode', 'appTheme'],
  },
  company: {
    key: 'company',
    storage: storageSession,
    whitelist: ['company'],
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
};
