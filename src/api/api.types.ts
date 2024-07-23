import { AppDate, ArrayOfUUID, Keys, OnlyUUID, PartialRecord, UUID, Values } from '../types/utils.types';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { TableSortOrderEnum } from '../components/TableList/tableTypes.types';
import { CompanyQueryTypeEnum } from '../types/companies.types';
import { FilterReturnDataType } from '../components/Filter/AppFilter';
import { AxiosResponse } from 'axios';
import { AppResponseType } from '../redux/app-redux.types';

export enum ApiHeaders {
  p_token = 'p-token',
  P_Token = 'P-Token',
  p_token_server = 'p-token-server',
  authorization = 'authorization',
  x_token_crm = 'x-token-crm',
  Device_Id = 'Device-Id',
  User_Reference = 'User-Reference',
}

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

export interface ApiQueryParams<Type = any> extends AppQueries<Type>, PaginationQuery, TimePeriodQuery {
  ids?: string;
  dirType?: ApiDirType;
  isArchived?: boolean;
  withDeleted?: boolean;
  withDefault?: boolean;
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

export interface ApiResponse<D = any, M = any> extends AxiosResponse<AppResponseType<D, M>> {}
