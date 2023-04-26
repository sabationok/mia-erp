import { colors, statusData, statusDataMap } from './statuses.data';
import {
  transactionsColumns,
  transactionsMockData,
  transactionsSearchParams,
  trTableActions,
  useTransactionsActions,
} from './transactions.data';
import { trCategories } from './categories.data';
import addButtons from './future/createActions.data';
import directories from './directories.data';
import { iconId } from '../img/sprite';
import { appPages, pages } from './pages.data';
import { reports } from './reports.data';
import { companiesTableColumns } from './companies.data';
import { appSettings } from './appSettings.data';
import { getChildOptions, getOwnerOptions, getParentOptions, selects } from './select.data';
import sideBarLeftData from './sideBarLeft.data';
import { activitiesMockData } from './companyActivities.data';
import { permissionsSearchParams, permissionsTableColumns } from './permissions.data';

export {
  sideBarLeftData,
  statusData,
  transactionsMockData,
  useTransactionsActions,
  trCategories,
  addButtons,
  statusDataMap,
  companiesTableColumns,
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
  trTableActions,
  activitiesMockData,
  permissionsTableColumns,
  permissionsSearchParams,
};
