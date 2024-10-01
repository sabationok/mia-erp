import { AppDate, ArrayOfUUID, Keys, OnlyUUID, PartialRecord, UUID, Values } from '../types/utils.types';
import { ApiDirType } from '../redux/APP_CONFIGS';
import { TableSortOrderEnum } from '../components/TableList/tableTypes.types';
import { CompanyQueryTypeEnum } from '../types/companies/companies.types';
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
  Cookies_Permission = 'Cookies-Permission',
  cookies_permission = 'cokies-permission',
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

enum StringKey {
  search = 'search',
  searchBy = 'searchBy',
  searchRef = 'searchRef',
  sku = 'sku',
  barCode = 'barCode',
  label = 'label',
  langKey = 'langKey',
}
export type StringApiQuery = PartialRecord<Keys<typeof StringKey>, boolean>;

enum BooleanKey {
  isArchived = 'isArchived',
  withDeleted = 'withDeleted',
  withDefault = 'withDefault',
  deleted = 'deleted',
  disabled = 'disabled',
  createTreeData = 'createTreeData',
  getAll = 'getAll',
  isSelectable = 'isSelectable',
  disabledForClient = 'disabledForClient',
  isDefault = 'isDefault',
  asDefault = 'asDefault',
  fullInfo = 'fullInfo',
}

export type BooleanApiQuery = PartialRecord<Keys<typeof BooleanKey>, boolean>;

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
export enum DataView {
  tree = 'tree',
  list = 'list',
}

export interface StatusQueryParams<Internal extends string = string> {
  status?: string | { internal?: Internal; external?: string };
  statusType?: 'internal' | 'external';
}
export interface HasReferenceQuery {
  reference?: string | { internal?: string; external?: string };
  referenceType?: 'internal' | 'external';
}

export type SortOrderType = 'desc' | 'asc' | 'DESC' | 'ASC';

export interface ApiQuerySortParams<DataPath = any, DataKey = any> {
  sortOrder?: SortOrderType;
  sortPath?: DataPath | string;
  dataKey?: DataKey | string;
}

export interface ApiQuerySearchParams<Path extends string = string> {
  searchPath?: Path;
  // dataKey?: DataKey | string;
  search?: string;
}

export interface ApiQueryParams<Type = any>
  extends Record<string, any>,
    RefQueries,
    IdQueries,
    IdsQueries,
    BooleanApiQuery,
    StringApiQuery,
    PaginationQuery,
    TimePeriodQuery,
    StatusQueryParams,
    HasReferenceQuery {
  ids?: UUID[];
  type?: Type;
  dirType?: ApiDirType;
  dataView?: DataView | Keys<typeof DataView>;
  depth?: number;
  sortParams?: ApiQuerySortParams;
  sortOrder?: TableSortOrderEnum;
  companyType?: CompanyQueryTypeEnum;
}

export interface ApiAxiosResponse<D = any, M = any> extends AxiosResponse<AppResponseType<D, M>> {}
