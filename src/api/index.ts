import { ApiDirType } from '../redux/APP_CONFIGS';
import { FilterReturnDataType } from '../components/Filter/AppFilter';
import { AppDate, ArrayOfUUID, Keys, OnlyUUID, PartialRecord, UUID, Values } from '../types/utils.types';
import { CompanyQueryTypeEnum } from 'types/companies.types';
import { TableSortOrderEnum } from '../components/TableList/tableTypes.types';

export * from './client.api';
export { default as TransactionsApi } from './transactions.api';
export { default as CompaniesApi } from './companies.api';
export { default as PermissionsApi } from './permissions.api';
export { default as DirectoriesApi } from './directories.api';
export { default as PriceManagementApi } from './priceManagement.api';
export { default as OffersApi } from './offers.api';
export { default as OrdersApi } from './orders.api';
export { default as RefundsApi } from './refunds.api';
export { default as WarehousesApi } from './warehouses.api';
export { default as PaymentsApi } from './payments.api';
export { default as InvoicesApi } from './invoices.api';
export { default as ShipmentsApi } from './shipments.api';
export { default as DeliveriesApi } from './deliveries.api';
export { default as CustomersApi } from './customers.api';
export { default as CommunicationApi } from './communication.api';
export { default as ExtServicesApi } from './ext-services.api';
export { default as IntegrationsApi } from './integrations.api';

export * from './offers.api';
export * from './createApiCall.api';
export * from './transactions.api';
export * from './companies.api';
export * from './permissions.api';
export * from './directories.api';
export * from './offers.api';
export * from './orders.api';
export * from './refunds.api';
export * from './warehouses.api';
export * from './payments.api';
export * from './invoices.api';
export * from './shipments.api';
export * from './deliveries.api';
export * from './customers.api';
export * from './communication.api';
export * from './ext-services.api';
export * from './integrations.api';

// sep PRICES
export * from './Discounts.api';
export * from './priceManagement.api';

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

export enum RefQueryKeyEnum {
  owner = 'owner',
  parent = 'parent',
  product = 'product',
  inventory = 'inventory',
  warehouse = 'warehouse',
  variation = 'variation',
  list = 'list',
  price = 'price',
  order = 'order',
  slot = 'slot',
  category = 'category',
  property = 'property',
  payment = 'payment',
  invoice = 'invoice',
  shipment = 'shipment',
  tag = 'tag',
  offer = 'offer',
  brand = 'brand',
  cart = 'cart',
}
export enum IdQueryKeyEnum {
  ownerId = 'ownerId',
  parentId = 'parentId',
  productId = 'productId',
  inventoryId = 'inventoryId',
  warehouseId = 'warehouseId',
  variationId = 'variationId',
  listId = 'listId',
  priceId = 'priceId',
  orderId = 'orderId',
  slotId = 'slotId',
  categoryId = 'categoryId',
  propertyId = 'propertyId',
  paymentId = 'paymentId',
  invoiceId = 'invoiceId',
  shipmentId = 'shipmentId',
  tagId = 'tagId',
  groupId = 'groupId',
  offerId = 'offerId',
  brandId = 'brandId',
  customerId = 'customerId',
  managerId = 'managerId',
  cartId = 'cartId',
}
export enum IdsQueryKeyEnum {
  ownersIds = 'ownersIds',
  parentsIds = 'parentsIds',
  productsIds = 'productsIds',
  warehousesIds = 'warehousesIds',
  variationsIds = 'variationsIds',
  inventoriesIds = 'inventoriesIds',
  listsIds = 'listsIds',
  pricesIds = 'pricesIds',
  ordersIds = 'ordersIds',
  customerIds = 'customerIds',
  slotsIds = 'slotsIds',
  propertiesIds = 'propertiesIds',
  brandsIds = 'brandsIds',
  categoriesIds = 'categoriesIds',
  paymentsIds = 'paymentsIds',
  invoicesIds = 'invoicesIds',
  offersIds = 'offersIds',
  tagsIds = 'tagsIds',
}

export type BaseQueryKeyType = Values<typeof RefQueryKeyEnum>;

export type IdQueryKeyType = Keys<typeof IdQueryKeyEnum>;

export type IdsQueryKeyType = Keys<typeof IdsQueryKeyEnum>;

export type RefQueries = PartialRecord<BaseQueryKeyType, OnlyUUID>;
export type IdQueries = PartialRecord<IdQueryKeyType, UUID>;
export type IdsQueries = PartialRecord<IdsQueryKeyType, ArrayOfUUID>;

export interface AppQueries<Type = any> extends Record<string, any>, RefQueries, IdQueries, IdsQueries {
  type?: Type;
}
export interface PaginationQuery {
  limit?: number;
  offset?: number;
}
export interface TimePeriodQuery {
  timeFrom?: number;
  timeTo?: number;
}

export interface DatePeriodQuery {
  dateFrom?: AppDate;
  dateTo?: AppDate;
}

export interface AppQueryParams<Type = any> extends AppQueries<Type>, PaginationQuery, TimePeriodQuery {
  ids?: string;
  dirType?: ApiDirType;
  isArchived?: boolean;
  withDeleted?: boolean;
  deleted?: boolean;
  disabled?: boolean;
  createTreeData?: boolean;
  getAll?: boolean;
  dataView?: 'tree' | 'list';
  depth?: number;
  isSelectable?: boolean;
  sortParams?: ApiQuerySortParams;
  sortOrder?: TableSortOrderEnum;
  search?: string;
  searchBy?: string;
  searchRef?: string;
  disabledForClient?: boolean;
  status?: string | { internal?: string; external?: string };
  reference?: string | { internal?: string; external?: string };
  statusType?: 'internal' | 'external';
  referenceType?: 'internal' | 'external';
  isDefault?: boolean;
  asDefault?: boolean;
  fullInfo?: boolean;
  categories?: UUID[];

  companyType?: CompanyQueryTypeEnum;

  sku?: string;
  barCode?: string;
  label?: string;
  langKey?: string;

  filterParams?: Partial<FilterReturnDataType>;
}

export type SortOrderType = 'desc' | 'asc' | 'DESC' | 'ASC';

export interface ApiQuerySortParams<DataPath = any, DataKey = any> {
  sortOrder?: SortOrderType;
  sortPath?: DataPath | string;
  dataKey?: DataKey | string;
}

export interface ApiQuerySearchParams<Path = any> {
  searchPath?: Path | string;
  // dataKey?: DataKey | string;
  search?: string;
}
