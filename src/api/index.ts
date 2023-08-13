import baseApi, { baseURL, token } from './baseApi';
// import { token, baseURL } from './baseApi';
import { createApiCall } from './createApiCall.api';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { FilterReturnDataType } from '../components/Filter/AppFilter';

export { default as TransactionsApi } from './transactions.api';
export { default as CompaniesApi } from './companies.api';
export { default as PermissionsApi } from './permissions.api';
export { default as DirectoriesApi } from './directories.api';

export { default as PriceManagementApi } from './priceManagement.api';
export { default as ProductsApi } from './products.api';
export { default as OrdersApi } from './ordersApi.api';
export { default as RefundsApi } from './refunds.api';
export { default as WarehousesApi } from './warehouses.api';

export interface AppQueryParams {
  dirType?: ApiDirType;
  isArchived?: boolean;
  createTreeData?: boolean;
  owner?: string;
  sortParams?: ISortParams;
  search?: string;
  searchBy?: string;
  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
  filterParams?: Partial<FilterReturnDataType>;
}

export type SortOrder = 'desc' | 'asc' | 'descending' | 'ascending' | 'DESC' | 'ASC';

export interface ISortParams<DataPath = any> {
  sortOrder?: SortOrder;
  dataPath?: DataPath | string;
}

export { baseApi, token, baseURL, createApiCall };
