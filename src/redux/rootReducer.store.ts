import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/users.slice';
import { appSettingsSlice } from './appSettings/appSettings.slice';
import { appPageSlice } from './page/pageSlice';
import { financesSlice } from './finances/finances.slice';
import { persistorConfigs } from './configs.store';
import { customRolesSlice } from './customRoles/customRoles.slice';
import { permissionsSlice } from './permissions/permissions.slice';
import { directoriesSlice } from './directories/directories.slice';
import { offersSlice } from './products/offers.slice';
import { priceManagementSlice } from './priceManagement/priceManagement.slice';
import { ordersSlice } from './orders/orders.slice';
import { refundsSlice } from './refunds/refunds.slice';
import { warehousesSlice } from './warehouses/warehouses.slice';
import { customersSlice } from './customers/customers.slice';
import { invoicesSlice } from './invoices/invoices.slice';
import { shipmentsSlice } from './shipments/shipments.slice';
import { paymentsSlice } from './payments/payments.slice';
import { integrationsSlice } from './integrations/integrations.slice';
import { deliveriesSlice } from './deliveries/deliveries.slice';
import { companiesSlice } from './companies/companies.slice';
import { discountsSlice } from './priceManagement/discounts/discounts.slice';
import { cartSlice } from './cart/cart.slice';
import { tagsSlice } from './tags/tags.slice';
import { linksSlice } from './tracking/links/links.slice';

const rootReducer = combineReducers({
  [authSlice.name]: persistReducer(persistorConfigs.auth, authSlice.reducer),
  [usersSlice.name]: usersSlice.reducer,
  [companiesSlice.name]: companiesSlice.reducer,
  [directoriesSlice.name]: persistReducer(persistorConfigs.directories, directoriesSlice.reducer),
  [appSettingsSlice.name]: persistReducer(persistorConfigs.appSettings, appSettingsSlice.reducer),
  [permissionsSlice.name]: persistReducer(persistorConfigs.permissions, permissionsSlice.reducer),
  [appPageSlice.name]: persistReducer(persistorConfigs.pageSettings, appPageSlice.reducer),
  [financesSlice.name]: persistReducer(persistorConfigs.finances, financesSlice.reducer),
  [offersSlice.name]: persistReducer(persistorConfigs.offers, offersSlice.reducer),
  [ordersSlice.name]: persistReducer(persistorConfigs.orders, ordersSlice.reducer),
  [customRolesSlice.name]: persistReducer(persistorConfigs.customRoles, customRolesSlice.reducer),
  [priceManagementSlice.name]: persistReducer(persistorConfigs.priceLists, priceManagementSlice.reducer),
  [refundsSlice.name]: persistReducer(persistorConfigs.refunds, refundsSlice.reducer),
  [warehousesSlice.name]: persistReducer(persistorConfigs.warehouses, warehousesSlice.reducer),
  [customersSlice.name]: persistReducer(persistorConfigs.customers, customersSlice.reducer),
  [invoicesSlice.name]: persistReducer(persistorConfigs.invoices, invoicesSlice.reducer),
  [paymentsSlice.name]: persistReducer(persistorConfigs.payments, paymentsSlice.reducer),
  [shipmentsSlice.name]: persistReducer(persistorConfigs.shipments, shipmentsSlice.reducer),
  [deliveriesSlice.name]: persistReducer(persistorConfigs.deliveries, deliveriesSlice.reducer),
  [integrationsSlice.name]: persistReducer(persistorConfigs.integrations, integrationsSlice.reducer),
  [discountsSlice.name]: persistReducer(persistorConfigs.discounts, discountsSlice.reducer),
  [cartSlice.name]: persistReducer(persistorConfigs.cart, cartSlice.reducer),
  [tagsSlice.name]: persistReducer(persistorConfigs.tags, tagsSlice.reducer),
  [linksSlice.name]: linksSlice.reducer,
});

export type RootReducerType = typeof rootReducer;

export default rootReducer;
