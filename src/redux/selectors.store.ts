import { useSelector } from 'react-redux';
import { ApiDirType } from './APP_CONFIGS';
import { IAuthState } from '../types/auth/auth.types';
import { FinancesState } from './finances/finances.slice';
import { CustomRolesState } from './customRoles/customRoles.slice';
import { IUsersState } from './users/users.types';
import { AppSettingsState } from './appSettings/appSettings.slice';
import { OffersState } from './products/offers.slice';
import { PriceManagementState } from './priceManagement/priceManagement.slice';
import { IDirItemBase } from '../types/dir.types';
import { DirectoriesState } from './directories/directories.slice';
import { OrdersState } from './orders/orders.slice';
import { ReturnsState } from './refunds/returns.slice';
import { WarehousingState } from './warehouses/warehouses.slice';
import { IPermissionsState } from '../types/permissions.types';
import { CustomersState } from './customers/customers.slice';
import { PaymentsState } from './payments/payments.slice';
import { InvoicesState } from './invoices/invoices.slice';
import { ShipmentsState } from './shipments/shipments.slice';
import { ConnectionsState } from './integrations/integrations.slice';
import { DeliveriesState } from './deliveries/deliveries.slice';
import { DiscountsState } from './priceManagement/discounts/discounts.slice';
import { TagsState } from './tags/tags.slice';
import { LinksState } from './tracking/links/links.slice';
import { ChatState } from './chat/chat.slice';
import { CompaniesState } from './companies/companies.slice';
import { OAuthState } from './auth/o-auth.slice';
import { AppRootState } from './reduxTypes.types';

export const useAuthSelector = () => useSelector<AppRootState, IAuthState>((state: AppRootState) => state.auth);
export const useUsersSelector = () => useSelector<AppRootState, IUsersState>((state: AppRootState) => state.users);
export const useAppSettingsSelector = () =>
  useSelector<AppRootState, AppSettingsState>((state: AppRootState) => state.appSettings);
export const usePaymentsSelector = () =>
  useSelector<AppRootState, PaymentsState>((state: AppRootState) => state.payments);
export const useInvoicesSelector = () =>
  useSelector<AppRootState, InvoicesState>((state: AppRootState) => state['invoicing']);

export const useConnectionsSelector = () =>
  useSelector<AppRootState, ConnectionsState>((state: AppRootState) => state['connections']);
export const useOAuthSelector = () => useSelector<AppRootState, OAuthState>((state: AppRootState) => state['oauth']);
export const useShipmentsSelector = () =>
  useSelector<AppRootState, ShipmentsState>((state: AppRootState) => state.shipments);
export const useDeliveriesSelector = () =>
  useSelector<AppRootState, DeliveriesState>((state: AppRootState) => state.deliveries);
export const useCustomersSelector = () =>
  useSelector<AppRootState, CustomersState>((state: AppRootState) => state.customers);
export const useCommunicationSelector = () =>
  useSelector<AppRootState, CustomersState>((state: AppRootState) => state['customers']);
export const useAppPageSettingsSelector = () => useSelector((state: AppRootState) => state.appPage);
export const useTransactionsSelector = (): FinancesState =>
  useSelector<AppRootState, FinancesState>((state: AppRootState): FinancesState => state.finances);

export const useFinancesSelector = (): FinancesState =>
  useSelector<AppRootState, FinancesState>((state: AppRootState): FinancesState => state.finances);

export const useOffersSelector = () =>
  useSelector<AppRootState, OffersState>((state: AppRootState): OffersState => state?.['offers']);
export const usePropertiesSelector = () =>
  useSelector<AppRootState, OffersState['propertiesList']>(
    (state: AppRootState): OffersState['propertiesList'] => state?.['offers']?.propertiesList
  );
export const useOrdersSelector = () =>
  useSelector<AppRootState, OrdersState>((state: AppRootState): OrdersState => state.orders);

export const usePermissionsSelector = () =>
  useSelector<AppRootState, IPermissionsState>((state: AppRootState): IPermissionsState => state['permissions']);
export const useCompaniesSelector = () =>
  useSelector<AppRootState, CompaniesState>((state: AppRootState): CompaniesState => state['companies']);
export const useRefundsSelector = () =>
  useSelector<AppRootState, ReturnsState>((state: AppRootState): ReturnsState => state.returns);
export const usePriceManagementSelector = () =>
  useSelector<AppRootState, PriceManagementState>((state: AppRootState): PriceManagementState => state.priceManagement);

export const usePriceDiscountsSelector = () =>
  useSelector<AppRootState, DiscountsState>((state: AppRootState): DiscountsState => state?.['discounts']);
export const useWarehousesSelector = () =>
  useSelector<AppRootState, WarehousingState>((state: AppRootState): WarehousingState => state.warehouses);
export const useCustomRolesSelector = () =>
  useSelector<AppRootState, CustomRolesState>((state: AppRootState) => state.customRoles);

export const useCartsSelector = (): OrdersState =>
  useSelector<AppRootState, OrdersState>((state: AppRootState) => state?.['orders']);

export const useTagsSelector = (): TagsState =>
  useSelector<AppRootState, TagsState>((state: AppRootState) => state?.['tags']);

export const useLinksSelector = (): LinksState =>
  useSelector<AppRootState, LinksState>((state: AppRootState) => state?.['tracking_links']);

export const useChatSelector = (): ChatState =>
  useSelector<AppRootState, ChatState>((state: AppRootState) => state.chat);

export const useDirectorySelector = <DT extends ApiDirType = any>(
  dirType: DT
): {
  directory: IDirItemBase<DT>[];
  error?: DirectoriesState['error'];
  isLoading?: DirectoriesState['isLoading'];
} => {
  const state = useSelector((state: AppRootState) => state.directories);

  return { directory: state.directories[dirType] };
};
