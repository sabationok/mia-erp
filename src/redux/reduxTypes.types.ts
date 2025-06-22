import type { AppDispatch, RootState } from './store.store';
import type { AxiosError } from 'axios';
import type { PartialRecord, UUID } from '../types/utils.types';
import type { AuthState } from './auth/auth.slice';
import type { CompaniesState } from './companies/companies.slice';
import type { AppSettingsState } from './appSettings/appSettings.slice';
import type { DirectoriesState } from './directories/directories.slice';
import { OffersState } from './products/offers.slice';
import type { TagsState } from './tags/tags.slice';
import type { OrdersState } from './orders/orders.slice';
import type { InvoicesState } from './invoices/invoices.slice';
import type { PaymentsState } from './payments/payments.slice';
import type { DeliveriesState } from './deliveries/deliveries.slice';
import type { CustomersState } from './customers/customers.slice';
import { CounterpartiesState } from './counterparties/counterparties.slice';
import type { WarehousingState } from './warehouses/warehouses.slice';
import type { DiscountsState } from './priceManagement/discounts/discounts.slice';
import { CartsState } from './cart/carts.slice';
import { CartState } from './cart/cart.slice';
import { PermissionsState } from './permissions/permissions.slice';
import { FinancesState } from './finances/finances.slice';
import { PageState } from './page/pageSlice';
import { PriceManagementState } from './priceManagement/priceManagement.slice';
import { ShipmentsState } from './shipments/shipments.slice';
import { ReturnsState } from './refunds/returns.slice';
import { ConnectionsState } from './integrations/integrations.slice';
import { CustomRolesState } from './customRoles/customRoles.slice';
import { OAuthState } from './auth/o-auth.slice';
import { UsersState } from './users/users.slice';
import { LinksState } from './tracking/links/links.slice';
import { ChatState } from './chat/chat.slice';
import { WarehousesInventoriesState } from './warehouses/warehouses-inventories/warehouses-inventories.slice';
import { WarehousesDocumentsState } from './warehouses/warehouses-documents/warehouses-documents.slice';

export enum AppModuleName {
  connections = 'connections',
  auth = 'auth',
  oauth = 'oauth',
  permissions = 'permissions',
  appSettings = 'appSettings',
  appPage = 'appPage',
  categories = 'categories',
  counts = 'counts',
  directories = 'directories',
  finances = 'finances',
  offers = 'offers',
  tags = 'tags',
  orders = 'orders',
  invoices = 'invoices',
  payments = 'payments',
  shipments = 'shipments',
  deliveries = 'deliveries',
  returns = 'returns',
  warehouses = 'warehouses',
  warehousesInventories = 'warehousesInventories',
  warehousesDocuments = 'warehousesDocuments',
  customers = 'customers',
  priceLists = 'priceLists',
  customRoles = 'customRoles',
  roles = 'roles',
  priceManagement = 'priceManagement',
  companies = 'companies',
  invoicing = 'invoicing',
  discounts = 'discounts',
  cart = 'cart',
  carts = 'carts',
  tracking_links = 'tracking_links',
}

export type AppRootState = {
  auth: AuthState;
  companies: CompaniesState;
  appSettings: AppSettingsState;
  permissions: PermissionsState;
  directories: DirectoriesState;
  offers: OffersState;
  tags: TagsState;
  orders: OrdersState;
  invoicing: InvoicesState;
  payments: PaymentsState;
  deliveries: DeliveriesState;
  customers: CustomersState;
  counterparty: CounterpartiesState;
  warehouses: WarehousingState;
  discounts: DiscountsState;
  carts: CartsState;
  cart: CartState;
  finances: FinancesState;
  appPage: PageState;
  invoices: InvoicesState;
  priceManagement: PriceManagementState;
  shipments: ShipmentsState;
  returns: ReturnsState;
  connections: ConnectionsState;
  customRoles: CustomRolesState;
  oauth: OAuthState;
  users: UsersState;
  tracking_links: LinksState;
  counterparties: CounterpartiesState;
  chat: ChatState;
  warehousesInventories: WarehousesInventoriesState;
  warehousesDocuments: WarehousesDocumentsState;
};

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | Error | AxiosError;
};

export type AuthErrorType = AxiosError | Error | unknown;
export type StateErrorType = AxiosError | Error | unknown;

export type StateDataMap<Entity = any, KeyType extends string = any> = {
  dataMap: PartialRecord<UUID, Entity>;
  list: Entity[];
  keysMap: PartialRecord<KeyType, UUID[]>;
};

// const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   rejectValue: string | Error | AxiosError;
// }>();

// export default createAppAsyncThunk;

// type AsyncThunkConfig = {
//   /** return type for `thunkApi.getState` */
//   state?: unknown
//   /** type for `thunkApi.dispatch` */
//   dispatch?: Dispatch
//   /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
//   extra?: unknown
//   /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
//   rejectValue?: unknown
//   /** return type of the `serializeError` option callback */
//   serializedErrorType?: unknown
//   /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
//   pendingMeta?: unknown
//   /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
//   fulfilledMeta?: unknown
//   /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
//   rejectedMeta?: unknown
// }

export type SliceMap<RefKey extends string, InverseKey extends string, DataType, Extra = any> = {
  dataMap: Record<RefKey, DataType>;
  keysMap: Record<RefKey, InverseKey[]>;
  ids: RefKey[];
  extra?: Extra;
  list?: DataType[];
};
