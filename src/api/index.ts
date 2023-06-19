import baseApi, { baseURL, token } from './baseApi';
// import { token, baseURL } from './baseApi';
import { createApiCall } from './createApiCall.api';
import { ApiDirType } from '../redux/APP_CONFIGS';

export { default as TransactionsApi } from './transactions.api';
export { default as CompaniesApi } from './companies.api';
export { default as PermissionsApi } from './permissions.api';
export { default as DirectoriesApi } from './directories.api';

export interface AppQueryParams {
  dirType?: ApiDirType;
  isArchived?: boolean;
  createTreeData?: boolean;
  owner?: string;
}

export type SortOrder = 'DESC' | 'ASC';

export interface ISortParams<SP = any> {
  sortOrder?: SortOrder;
  sortBy?: SP | string;
}

export { baseApi, token, baseURL, createApiCall };
