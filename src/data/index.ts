import { colors, statusData, statusDataMap } from './statuses.data';
import { transactionsColumns, transactionsSearchParams } from './transactions.data';
import { trCategories } from './categories.data';
import addButtons from './future/createActions.data';
import directories from './directories.data';
import { iconId } from '../img/sprite';
import { appPages, pages } from './pages.data';
import { reportByContractorsColumns, reports } from './reports.data';
import { companiesTableColumns } from './companies.data';
import { appSettings } from './appSettings.data';
import { getChildOptions, getOwnerOptions, getParentOptions, selects } from './select.data';
import sideBarLeftData from './sideBarLeft.data';
import { activitiesMockData } from './activities.data';
import { permissionsSearchParams, permissionsTableColumns } from './permissions.data';
import { productsColumns, productsSearchParams } from './products.data';

import { warehousesTableColumnsForOrderCreateOrderSlotForm } from './warehauses.data';

import { priceListColumns, priceListContentColumns } from './priceManagement.data';

import { orderSlotTableColumns, ordersSearchParams, ordersTableColumns } from './orders.data';

export {
  priceListColumns,
  priceListContentColumns,
  productsColumns,
  productsSearchParams,
  sideBarLeftData,
  statusData,
  trCategories,
  addButtons,
  statusDataMap,
  companiesTableColumns,
  reportByContractorsColumns,
  colors,
  selects,
  iconId,
  getParentOptions,
  getChildOptions,
  getOwnerOptions,
  directories,
  pages,
  appPages,
  reports,
  appSettings,
  transactionsColumns,
  transactionsSearchParams,
  activitiesMockData,
  permissionsTableColumns,
  permissionsSearchParams,
  warehousesTableColumnsForOrderCreateOrderSlotForm,
  orderSlotTableColumns,
  ordersTableColumns,
  ordersSearchParams,
};
