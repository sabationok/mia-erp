import { useMemo } from 'react';
import { RootState } from './store.store';
import { useSelector } from 'react-redux';
import { IAuthState } from './auth/auth.types';
import { ITransactionsState } from './transactions/transactions.slice';
import { ICustomRolesState } from './customRoles/customRoles.slice';
import { IUsersState } from './users/users.types';
import { IAppSettings } from './appSettings/appSettings.slice';
import { IProductsState } from './products/products.slice';
import { IPriceListsState } from './priceManagement/priceManagement.slice';
import { ApiDirType } from './APP_CONFIGS';
import { IDirItemBase } from '../components/Directories/dir.types';
import { IDirectoriesState } from './directories/directories.slice';
import { IOrdersState } from './orders/orders.slice';
import { IRefundsState } from './refunds/refunds.slice';
import { IWarehouseState } from './warehouses/warehouses.slice';
import { IPermissionsState } from './permissions/permissions.types';
import { CustomersState } from './customers/customers.slice';
import { PaymentsState } from './payments/payments.slice';
import { InvoicesState } from './invoices/invoices.slice';
import { ShipmentsState } from './shipments/shipments.slice';

export const useAuthSelector = () => useSelector<RootState, IAuthState>((state: RootState) => state.auth);
export const useUsersSelector = () => useSelector<RootState, IUsersState>((state: RootState) => state.users);
export const useAppSettingsSelector = () =>
  useSelector<RootState, IAppSettings>((state: RootState) => state.appSettings);
export const useCustomersSelector = () => useSelector<RootState, CustomersState>((state: RootState) => state.customers);
export const usePaymentsSelector = () => useSelector<RootState, PaymentsState>((state: RootState) => state.payments);
export const useInvoicesSelector = () => useSelector<RootState, InvoicesState>((state: RootState) => state.invoices);
export const useShipmentsSelector = () => useSelector<RootState, ShipmentsState>((state: RootState) => state.shipments);
export const useAppPageSettingsSelector = () => useSelector((state: RootState) => state.appPage);
export const useTransactionsSelector = (): ITransactionsState =>
  useSelector<RootState, ITransactionsState>((state: RootState): ITransactionsState => state.transactions);

export const useProductsSelector = () =>
  useSelector<RootState, IProductsState>((state: RootState): IProductsState => state.products);
export const usePropertiesSelector = () =>
  useSelector<RootState, IProductsState['properties']>(
    (state: RootState): IProductsState['properties'] => state.products.properties
  );
export const useOrdersSelector = () =>
  useSelector<RootState, IOrdersState>((state: RootState): IOrdersState => state.orders);

export const usePermissionsSelector = () =>
  useSelector<RootState, IPermissionsState>((state: RootState): IPermissionsState => state['permissions']);
export const useRefundsSelector = () =>
  useSelector<RootState, IRefundsState>((state: RootState): IRefundsState => state['refunds']);
export const usePriceListsSelector = () =>
  useSelector<RootState, IPriceListsState>((state: RootState): IPriceListsState => state.priceLists);
export const useWarehousesSelector = () =>
  useSelector<RootState, IWarehouseState>((state: RootState): IWarehouseState => state.warehouses);
export const useCustomRolesSelector = () =>
  useSelector<RootState, ICustomRolesState>((state: RootState) => state.customRoles);

export const useDirectoriesSelector = <DT extends ApiDirType = any>(
  dirType: DT
): {
  directory: IDirItemBase<DT>[];
  error?: IDirectoriesState['error'];
  isLoading?: IDirectoriesState['isLoading'];
} => {
  const state = useSelector((state: RootState) => state.directories);

  return { directory: state.directories[dirType] };
};
export const useFindPriceListById = (_id?: string) => {
  const { lists } = usePriceListsSelector();
  return useMemo(() => {
    return lists.find(list => list._id === _id);
  }, [_id, lists]);
};
