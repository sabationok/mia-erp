import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/usersSlice';
import { appSettingsSlice } from './appSettings/appSettings.slice';
import { appPageSlice } from './page/pageSlice';
import { transactionsSlice } from './transactions/transactions.slice';
import { categoriesSlice } from './categories/categoriesSlice';
import { countsSlice } from './counts/counts.slice';
// import { documentsSlice } from './documents/documents.slice';
import { persistorConfigs } from './configs.store';
import { customRolesSlice } from './customRoles/customRoles.slice';

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(persistorConfigs.auth, authSlice.reducer),
  [usersSlice.name]: usersSlice.reducer,
  [appSettingsSlice.name]: persistReducer(persistorConfigs.appSettings, appSettingsSlice.reducer),
  [appPageSlice.name]: persistReducer(persistorConfigs.pageSettings, appPageSlice.reducer),
  [transactionsSlice.name]: persistReducer(persistorConfigs.transactions, transactionsSlice.reducer),
  [countsSlice.name]: persistReducer(persistorConfigs.counts, countsSlice.reducer),
  [categoriesSlice.name]: persistReducer(persistorConfigs.categories, categoriesSlice.reducer),
  [customRolesSlice.name]: customRolesSlice.reducer,
  // [documentsSlice.name]: documentsSlice.reducer,
});

export default rootReducer;
