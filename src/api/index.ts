import baseApi, { baseURL, token } from './baseApi';
import { createApiCall } from './createApiCall.api';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { FilterReturnDataType } from '../components/Filter/AppFilter';
import { OnlyUUID, UUID } from '../redux/global.types';

export { default as TransactionsApi } from './transactions.api';
export { default as CompaniesApi } from './companies.api';
export { default as PermissionsApi } from './permissions.api';
export { default as DirectoriesApi } from './directories.api';
export { default as PriceManagementApi } from './priceManagement.api';
export { default as ProductsApi } from './products.api';
export { default as OrdersApi } from './orders.api';
export { default as RefundsApi } from './refunds.api';
export { default as WarehousesApi } from './warehouses.api';
export { default as PaymentsApi } from './payments.api';
export { default as InvoicesApi } from './invoices.api';
export { default as ShipmentsApi } from './shipments.api';
export { default as CustomersApi } from './customers.api';
export { default as CommunicationApi } from './communication.api';
export { default as ExtServicesApi } from './ext-services.api';
export { default as IntegrationsApi } from './integrations.api';

export enum AppQueryKey {
  dirType = 'dirType',
  isArchived = 'isArchived',
  createTreeData = 'createTreeData',
  owner = 'owner',
  sortParams = 'sortParams',
  search = 'search',
  searchBy = 'searchBy',
  timeFrom = 'timeFrom',
  timeTo = 'timeTo',
  filterParams = 'filterParams',
}

export interface AppQueryParams<Type = any> extends Record<string, any> {
  type?: Type;
  dirType?: ApiDirType;
  isArchived?: boolean;
  deleted?: boolean;
  isDefault?: boolean;
  disabled?: boolean;
  createTreeData?: boolean;
  sortParams?: ISortParams;
  search?: string;
  searchBy?: string;
  disabledForClient?: boolean;

  fullInfo?: boolean;

  owner?: OnlyUUID;
  parent?: OnlyUUID;
  product?: OnlyUUID;
  inventory?: OnlyUUID;
  warehouse?: OnlyUUID;
  variation?: OnlyUUID;
  list?: OnlyUUID;
  price?: OnlyUUID;
  order?: OnlyUUID;
  slot?: OnlyUUID;
  category?: OnlyUUID;
  payment?: OnlyUUID;
  invoice?: OnlyUUID;
  shipment?: OnlyUUID;
  service?: OnlyUUID;

  categories?: string[];

  timeFrom?: string | number | Date;
  timeTo?: string | number | Date;
  filterParams?: Partial<FilterReturnDataType>;
}

export interface AppQueries<Type = any> extends Record<string, any> {
  type?: Type;

  ownerId?: UUID;
  parentId?: UUID;
  productId?: UUID;
  inventoryId?: UUID;
  warehouseId?: UUID;
  variationId?: UUID;
  listId?: UUID;
  priceId?: UUID;
  orderId?: UUID;
  slotId?: UUID;
  categoryId?: UUID;
  paymentId?: UUID;
  invoiceId?: UUID;
  shipmentId?: UUID;
  serviceId?: UUID;
}

export type SortOrder = 'desc' | 'asc' | 'descending' | 'ascending' | 'DESC' | 'ASC';

export interface ISortParams<DataPath = any> {
  sortOrder?: SortOrder;
  dataPath?: DataPath | string;
}

export { baseApi, token, baseURL, createApiCall };
