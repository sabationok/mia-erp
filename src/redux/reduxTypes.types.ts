import { AppDispatch, RootState } from './store.store';
import { AxiosError } from 'axios';
import type { IAuthState } from '../types/auth.types';
import type { AppSettingsState } from './appSettings/appSettings.slice';
import type { DirectoriesState } from './directories/directories.slice';
import type { OffersState } from './products/offers.slice';
import type { TagsState } from './tags/tags.slice';
import type { OrdersState } from './orders/orders.slice';
import type { InvoicesState } from './invoices/invoices.slice';
import type { PaymentsState } from './payments/payments.slice';
import type { DeliveriesState } from './deliveries/deliveries.slice';
import type { CustomersState } from './customers/customers.slice';
import type { CounterpartiesState } from './counterparties/counterparties.slice';
import type { WarehousingState } from './warehouses/warehouses.slice';
import { DiscountsState } from './priceManagement/discounts/discounts.slice';
import { CompaniesState } from '../types/companies.types';

export type AppRootState = {
  auth: IAuthState;
  appSettings: AppSettingsState;
  permissions: PermissionState;
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
  companies: CompaniesState;
};

export enum AppModuleName {
  integrations = 'integrations',
  auth = 'auth',
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
  refunds = 'refunds',
  warehouses = 'warehouses',
  customers = 'customers',
  priceLists = 'priceLists',
  customRoles = 'customRoles',
  roles = 'roles',
  priceManagement = 'priceManagement',
  companies = 'companies',
  invoicing = 'invoicing',
  discounts = 'discounts',
  cart = 'cart',
}

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string | Error | AxiosError;
};

export type AuthErrorType = AxiosError | Error | unknown;
export type StateErrorType = AxiosError | Error | unknown;
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
};
