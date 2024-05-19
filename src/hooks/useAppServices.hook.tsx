import usePermissionsServiceHook, { PermissionService } from './usePermissionsService.hook';
import useProductsServiceHook, { OffersService } from './useProductsService.hook';
import useTransactionsServiceHook, { UseFinancesService } from './useTransactionsService.hook';
import { DirectoriesService } from './useDirService.hook';
import { useDirService } from './index';
import usePriceManagementServiceHook, { PriceManagementService } from './usePriceManagementService.hook';
import useAppSettingsHook, { AppSettingsService } from './useAppSettings.hook';
import useCompaniesService, { CompaniesService } from './useCompaniesService.hook';
import { createContext, useContext } from 'react';
import useWarehousesServiceHook, { WarehousesService } from './useWarehousesService.hook';
import useAppAuthHook, { AuthService } from './useAppAuth.hook';
import useOrdersServiceHook, { OrdersService } from './useOrdersService.hook';
import useCustomersService, { CustomersService } from './useCustomersService';
import usePaymentsServiceHook, { UsePaymentsService } from './usePaymentsService.hook';
import useShipmentsService, { UseShipmentsService } from './useShipmentsService.hook';
import useCustomRolesServiceHook, { CustomRolesService } from './useCustomRolesService.hook';
import useInvoicingService, { UseInvoicingService } from './useInvoicingService.hook';
import { AppModuleName } from '../redux/reduxTypes.types';
import useIntegrationsService, { UseIntegrationsService } from './useIntegrationsService.hook';
import UseDeliveriesServiceHook, { UseDeliveriesService } from './services/useDeliveriesService.hook';

export { AppModuleName as ServiceName } from '../redux/reduxTypes.types';
export interface AppService {
  [AppModuleName.permissions]: PermissionService;
  [AppModuleName.products]: OffersService;
  [AppModuleName.finances]: UseFinancesService;
  [AppModuleName.directories]: DirectoriesService;
  [AppModuleName.priceManagement]: PriceManagementService;
  [AppModuleName.appSettings]: AppSettingsService;
  [AppModuleName.companies]: CompaniesService;
  [AppModuleName.warehouses]: WarehousesService;
  [AppModuleName.auth]: AuthService;
  [AppModuleName.orders]: OrdersService;
  [AppModuleName.customers]: CustomersService;
  [AppModuleName.payments]: UsePaymentsService;
  [AppModuleName.invoicing]: UseInvoicingService;
  [AppModuleName.shipments]: UseShipmentsService;
  [AppModuleName.roles]: CustomRolesService;
  [AppModuleName.integrations]: UseIntegrationsService;
  [AppModuleName.deliveries]: UseDeliveriesService;
  get<T extends AppServiceKey = any>(module: T): AppService[T];
}

type AppServiceKey = keyof Omit<AppService, 'get'>;

// const isDevMode = ConfigService.isDevMode();
const useAppService = (): AppService => {
  const services: Omit<Record<AppServiceKey, any>, 'get'> = {
    auth: useAppAuthHook(),
    permissions: usePermissionsServiceHook(),
    integrations: useIntegrationsService(),
    products: useProductsServiceHook(),
    finances: useTransactionsServiceHook(),
    directories: useDirService(),
    priceManagement: usePriceManagementServiceHook(),
    appSettings: useAppSettingsHook(),
    companies: useCompaniesService(),
    warehouses: useWarehousesServiceHook(),
    orders: useOrdersServiceHook(),
    customers: useCustomersService(),
    payments: usePaymentsServiceHook(),
    invoicing: useInvoicingService(),
    shipments: useShipmentsService(),
    roles: useCustomRolesServiceHook(),
    deliveries: UseDeliveriesServiceHook(),
  };

  return Object.assign(services, {
    get(module: AppServiceKey) {
      return services[module];
    },
  });
};
export const AppServiceCTX = createContext<AppService>({} as AppService);

export const useAppServiceProvider = () => useContext(AppServiceCTX);

export const AppServiceProvider = ({ children }: { children?: React.ReactNode; isDevMode?: boolean }) => {
  const appService = useAppService();

  return <AppServiceCTX.Provider value={appService}>{children}</AppServiceCTX.Provider>;
};
export default AppServiceProvider;

// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | permissions');
// }, [permissions]);
// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | products');
// }, [products]);
// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | transactions');
// }, [transactions]);
// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | directories');
// }, [directories]);
// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | priceManagement');
// }, [priceManagement]);
// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | appSettings');
// }, [appSettings]);
// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | companies');
// }, [companies]);
// useEffect(() => {
//   isDevMode && console.log('Apply useAppService | warehouses');
// }, [warehouses]);
