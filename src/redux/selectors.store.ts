import { RootState } from './store.store';
import { useSelector } from 'react-redux';
import { ApiDirType } from './APP_CONFIGS';
import { IAuthState } from '../types/auth/auth.types';
import { IFinTransactionsState } from './finances/finances.slice';
import { ICustomRolesState } from './customRoles/customRoles.slice';
import { IUsersState } from './users/users.types';
import { AppSettingsState } from './appSettings/appSettings.slice';
import { OffersState } from './products/offers.slice';
import { PricesState } from './priceManagement/priceManagement.slice';
import { IDirItemBase } from '../types/dir.types';
import { DirectoriesState } from './directories/directories.slice';
import { OrdersState } from './orders/orders.slice';
import { IRefundsState } from './refunds/refunds.slice';
import { WarehousingState } from './warehouses/warehouses.slice';
import { IPermissionsState } from '../types/permissions.types';
import { CustomersState } from './customers/customers.slice';
import { PaymentsState } from './payments/payments.slice';
import { InvoicesState } from './invoices/invoices.slice';
import { ShipmentsState } from './shipments/shipments.slice';
import { IntegrationsState } from './integrations/integrations.slice';
import { DeliveriesState } from './deliveries/deliveries.slice';
import { DiscountsState } from './priceManagement/discounts/discounts.slice';
import { CartState } from './cart/cart.slice';
import { TagsState } from './tags/tags.slice';
import { LinksState } from './tracking/links/links.slice';
import { ChatState } from './chat/chat.slice';
import { CompaniesState } from './companies/companies.slice';

export const useAuthSelector = () => useSelector<RootState, IAuthState>((state: RootState) => state.auth);
export const useUsersSelector = () => useSelector<RootState, IUsersState>((state: RootState) => state.users);
export const useAppSettingsSelector = () =>
  useSelector<RootState, AppSettingsState>((state: RootState) => state.appSettings);
export const usePaymentsSelector = () => useSelector<RootState, PaymentsState>((state: RootState) => state.payments);
export const useInvoicesSelector = () =>
  useSelector<RootState, InvoicesState>((state: RootState) => state['invoicing']);

export const useIntegrationsSelector = () =>
  useSelector<RootState, IntegrationsState>((state: RootState) => state['connections']);
export const useShipmentsSelector = () => useSelector<RootState, ShipmentsState>((state: RootState) => state.shipments);
export const useDeliveriesSelector = () =>
  useSelector<RootState, DeliveriesState>((state: RootState) => state.deliveries);
export const useCustomersSelector = () => useSelector<RootState, CustomersState>((state: RootState) => state.customers);
export const useCommunicationSelector = () =>
  useSelector<RootState, CustomersState>((state: RootState) => state['customers']);
export const useAppPageSettingsSelector = () => useSelector((state: RootState) => state.appPage);
export const useTransactionsSelector = (): IFinTransactionsState =>
  useSelector<RootState, IFinTransactionsState>((state: RootState): IFinTransactionsState => state.transactions);

export const useFinancesSelector = (): IFinTransactionsState =>
  useSelector<RootState, IFinTransactionsState>((state: RootState): IFinTransactionsState => state.transactions);

export const useOffersSelector = () =>
  useSelector<RootState, OffersState>((state: RootState): OffersState => state?.['products']);
export const usePropertiesSelector = () =>
  useSelector<RootState, OffersState['properties']>(
    (state: RootState): OffersState['properties'] => state?.['products']?.properties
  );
export const useOrdersSelector = () =>
  useSelector<RootState, OrdersState>((state: RootState): OrdersState => state.orders);

export const usePermissionsSelector = () =>
  useSelector<RootState, IPermissionsState>((state: RootState): IPermissionsState => state['permissions']);
export const useCompaniesSelector = () =>
  useSelector<RootState, CompaniesState>((state: RootState): CompaniesState => state['companies']);
export const useRefundsSelector = () =>
  useSelector<RootState, IRefundsState>((state: RootState): IRefundsState => state['refunds']);
export const usePriceManagementSelector = () =>
  useSelector<RootState, PricesState>((state: RootState): PricesState => state.priceLists);

export const usePriceDiscountsSelector = () =>
  useSelector<RootState, DiscountsState>((state: RootState): DiscountsState => state?.['discounts']);

export const useWarehousesSelector = () =>
  useSelector<RootState, WarehousingState>((state: RootState): WarehousingState => state.warehouses);
export const useCustomRolesSelector = () =>
  useSelector<RootState, ICustomRolesState>((state: RootState) => state.customRoles);

export const useCartSelector = (): CartState =>
  useSelector<RootState, CartState>((state: RootState) => state?.['cart']);

export const useTagsSelector = (): TagsState =>
  useSelector<RootState, TagsState>((state: RootState) => state?.['tags']);

export const useLinksSelector = (): LinksState =>
  useSelector<RootState, LinksState>((state: RootState) => state?.['tracking/links']);

export const useChatSelector = (): ChatState => useSelector<RootState, ChatState>((state: RootState) => state.chat);

export const useDirectorySelector = <DT extends ApiDirType = any>(
  dirType: DT
): {
  directory: IDirItemBase<DT>[];
  error?: DirectoriesState['error'];
  isLoading?: DirectoriesState['isLoading'];
} => {
  const state = useSelector((state: RootState) => state.directories);

  return { directory: state.directories[dirType] };
};
