import { persistReducer } from 'redux-persist';
import { combineReducers, Slice } from '@reduxjs/toolkit';
import { authSlice } from './auth/auth.slice';
import { usersSlice } from './users/users.slice';
import { appSettingsSlice } from './appSettings/appSettings.slice';
import { appPageSlice } from './page/pageSlice';
import { financesSlice } from './finances/finances.slice';
import { AppRootStateKey, persistorConfigs } from './configs.store';
import { customRolesSlice } from './customRoles/customRoles.slice';
import { permissionsSlice } from './permissions/permissions.slice';
import { directoriesSlice } from './directories/directories.slice';
import { offersSlice } from './products/offers.slice';
import { priceManagementSlice } from './priceManagement/priceManagement.slice';
import { ordersSlice } from './orders/orders.slice';
import { returnsSlice } from './refunds/returns.slice';
import { warehousesSlice } from './warehouses/warehouses.slice';
import { customersSlice } from './customers/customers.slice';
import { invoicesSlice } from './invoices/invoices.slice';
import { shipmentsSlice } from './shipments/shipments.slice';
import { paymentsSlice } from './payments/payments.slice';
import { integrationsSlice } from './integrations/integrations.slice';
import { deliveriesSlice } from './deliveries/deliveries.slice';
import { companiesSlice } from './companies/companies.slice';
import { discountsSlice } from './priceManagement/discounts/discounts.slice';
import { tagsSlice } from './tags/tags.slice';
import { linksSlice } from './tracking/links/links.slice';
import { counterpartiesSlice } from './counterparties/counterparties.slice';
import { chatSlice } from './chat/chat.slice';
import { warehousesDocumentsSlice } from './warehouses/warehouses-documents/warehouses-documents.slice';
import { warehousesInventoriesSlice } from './warehouses/warehouses-inventories/warehouses-inventories.slice';
import { oAuthSlice } from './auth/o-auth.slice';
import { cartsSlice } from './cart/carts.slice';
import { Reducer } from 'redux';
import { assign } from 'lodash';

const addSlice = <S extends Slice<any, any, AppRootStateKey>>(slice: S): Record<S['name'], Reducer<S>> => {
  const pConfigs = persistorConfigs[slice.name] as any;
  return { [slice.name]: pConfigs ? persistReducer(pConfigs, slice.reducer) : slice.reducer } as Record<
    S['name'],
    Reducer<S>
  >;
};

const reducers = assign(
  addSlice(authSlice),
  addSlice(oAuthSlice),
  addSlice(usersSlice),
  addSlice(companiesSlice),
  addSlice(discountsSlice),
  addSlice(integrationsSlice),
  addSlice(cartsSlice),
  addSlice(directoriesSlice),
  addSlice(appSettingsSlice),
  addSlice(permissionsSlice),
  addSlice(appPageSlice),
  addSlice(financesSlice),
  addSlice(offersSlice),
  addSlice(ordersSlice),
  addSlice(customRolesSlice),
  addSlice(priceManagementSlice),
  addSlice(returnsSlice),
  addSlice(customersSlice),
  addSlice(invoicesSlice),
  addSlice(paymentsSlice),
  addSlice(shipmentsSlice),
  addSlice(deliveriesSlice),
  addSlice(tagsSlice),
  addSlice(linksSlice),
  addSlice(counterpartiesSlice),
  addSlice(chatSlice),
  addSlice(warehousesSlice),
  addSlice(warehousesDocumentsSlice),
  addSlice(warehousesInventoriesSlice)
);

const rootReducer = combineReducers(
  reducers
  // {
  // [authSlice.name]: persistReducer(persistorConfigs.auth, authSlice.reducer),
  // [oAuthSlice.name]: oAuthSlice.reducer,
  // [usersSlice.name]: usersSlice.reducer,
  // [companiesSlice.name]: companiesSlice.reducer,
  // [directoriesSlice.name]: persistReducer(persistorConfigs.directories, directoriesSlice.reducer),
  // [appSettingsSlice.name]: persistReducer(persistorConfigs.appSettings, appSettingsSlice.reducer),
  // [permissionsSlice.name]: persistReducer(persistorConfigs.permissions, permissionsSlice.reducer),
  // [appPageSlice.name]: persistReducer(persistorConfigs.pageSettings, appPageSlice.reducer),
  // [financesSlice.name]: persistReducer(persistorConfigs.finances, financesSlice.reducer),
  // [offersSlice.name]: persistReducer(persistorConfigs.offers, offersSlice.reducer),
  // [ordersSlice.name]: persistReducer(persistorConfigs.orders, ordersSlice.reducer),
  // [customRolesSlice.name]: persistReducer(persistorConfigs.customRoles, customRolesSlice.reducer),
  // [priceManagementSlice.name]: persistReducer(persistorConfigs.priceLists, priceManagementSlice.reducer),
  // [refundsSlice.name]: persistReducer(persistorConfigs.refunds, refundsSlice.reducer),
  // [customersSlice.name]: persistReducer(persistorConfigs.customers, customersSlice.reducer),
  // [invoicesSlice.name]: persistReducer(persistorConfigs.invoices, invoicesSlice.reducer),
  // [paymentsSlice.name]: persistReducer(persistorConfigs.payments, paymentsSlice.reducer),
  // [shipmentsSlice.name]: persistReducer(persistorConfigs.shipments, shipmentsSlice.reducer),
  // [deliveriesSlice.name]: persistReducer(persistorConfigs.deliveries, deliveriesSlice.reducer),
  // [integrationsSlice.name]: persistReducer(persistorConfigs.connections, integrationsSlice.reducer),
  // [discountsSlice.name]: persistReducer(persistorConfigs.discounts, discountsSlice.reducer),
  // [cartSlice.name]: persistReducer(persistorConfigs.cart, cartSlice.reducer),
  // [cartsSlice.name]: persistReducer(persistorConfigs[cartsSlice.name], cartsSlice.reducer),
  // // [tagsSlice.name]: persistReducer(persistorConfigs.tags, tagsSlice.reducer),
  // // [linksSlice.name]: linksSlice.reducer,
  // // [counterpartiesState.name]: counterpartiesState.reducer,
  // [chatSlice.name]: chatSlice.reducer,
  // // [warehousesSlice.name]: persistReducer(persistorConfigs.warehouses, warehousesSlice.reducer),
  // // [warehousesDocumentsSlice.name]: warehousesDocumentsSlice.reducer,
  // // [warehousesInventoriesSlice.name]: warehousesInventoriesSlice.reducer,
  // }
);

export type RootReducerType = typeof rootReducer;

export default rootReducer;
