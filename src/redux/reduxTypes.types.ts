import { AppDispatch, RootState } from './store.store';
import { AxiosError } from 'axios';

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
