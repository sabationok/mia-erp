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
import { priceManagementSlice } from './priceManagement/priceManagement.slice';
import { ordersSlice } from './orders/orders.slice';
import { refundsSlice } from './refunds/refunds.slice';
import { warehousesSlice } from './warehouses/warehouses.slice';
import { customersSlice } from './customers/customers.slice';

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(persistorConfigs.auth, authSlice.reducer),
  [usersSlice.name]: usersSlice.reducer,
  [directoriesSlice.name]: persistReducer(persistorConfigs.directories, directoriesSlice.reducer),
  [appSettingsSlice.name]: persistReducer(persistorConfigs.appSettings, appSettingsSlice.reducer),
  [permissionsSlice.name]: persistReducer(persistorConfigs.permissions, permissionsSlice.reducer),
  [appPageSlice.name]: persistReducer(persistorConfigs.pageSettings, appPageSlice.reducer),
  [transactionsSlice.name]: persistReducer(persistorConfigs.transactions, transactionsSlice.reducer),
  [productsSlice.name]: persistReducer(persistorConfigs.products, productsSlice.reducer),
  [ordersSlice.name]: persistReducer(persistorConfigs.orders, ordersSlice.reducer),
  [customRolesSlice.name]: persistReducer(persistorConfigs.customRoles, customRolesSlice.reducer),
  [priceManagementSlice.name]: persistReducer(persistorConfigs.priceLists, priceManagementSlice.reducer),
  [refundsSlice.name]: persistReducer(persistorConfigs.refunds, refundsSlice.reducer),
  [warehousesSlice.name]: persistReducer(persistorConfigs.warehouses, warehousesSlice.reducer),
  [customersSlice.name]: persistReducer(persistorConfigs.customers, customersSlice.reducer),
});

export type RootReducerType = typeof rootReducer;

export default rootReducer;
