import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/usersSlice';
import { appSettingsSlice } from './appSettings/appSettings.slice';
import { appPageSlice } from './page/pageSlice';
import { transactionsSlice } from './transactions/transactions.slice';
// import { categoriesSlice } from './categories/categoriesSlice';
import { countsSlice } from './counts/counts.slice';
// import { documentsSlice } from './documents/documents.slice';
import { presistorConfigs } from './configs.store';

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(presistorConfigs.auth, authSlice.reducer),
  [usersSlice.name]: usersSlice.reducer,
  [appSettingsSlice.name]: persistReducer(presistorConfigs.appSettings, appSettingsSlice.reducer),
  [appPageSlice.name]: persistReducer(presistorConfigs.pageSettings, appPageSlice.reducer),
  [transactionsSlice.name]: persistReducer(presistorConfigs.transactions, transactionsSlice.reducer),
  [countsSlice.name]: persistReducer(presistorConfigs.counts, countsSlice.reducer),
  // [categoriesSlice.name]: persistReducer(presistorConfigs.categories, categoriesSlice.reducer),
  // [documentsSlice.name]: documentsSlice.reducer,
});

export default rootReducer;
