import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/usersSlice';
import { appSettingsSlice } from './appSettings/appSettings.slice';
import { appPageSlice } from './page/pageSlice';
import { transactionsSlice } from './transactions/transactions.slice';
import { persistorConfigs } from './configs.store';
import { customRolesSlice } from './customRoles/customRoles.slice';
import { permissionsSlice } from './permissions/permissions.slice';
import { directoriesSlice } from './directories/directories.slice';
import { productsSlice } from './products/products.slice';

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(persistorConfigs.auth, authSlice.reducer),
  [usersSlice.name]: usersSlice.reducer,
  [appSettingsSlice.name]: persistReducer(persistorConfigs.appSettings, appSettingsSlice.reducer),
  [appPageSlice.name]: persistReducer(persistorConfigs.pageSettings, appPageSlice.reducer),
  [transactionsSlice.name]: persistReducer(persistorConfigs.transactions, transactionsSlice.reducer),
  [productsSlice.name]: persistReducer(persistorConfigs.products, productsSlice.reducer),
  [customRolesSlice.name]: persistReducer(persistorConfigs.customRoles, customRolesSlice.reducer),
  [permissionsSlice.name]: persistReducer(persistorConfigs.permissions, permissionsSlice.reducer),
  [directoriesSlice.name]: persistReducer(persistorConfigs.directories, directoriesSlice.reducer),
});

export type RootReducerType = typeof rootReducer;

export default rootReducer;
