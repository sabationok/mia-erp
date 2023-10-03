import usePermissionsServiceHook, { PermissionService } from './usePermissionsService.hook';
import useProductsServiceHook, { ProductsService } from './useProductsService.hook';
import useTransactionsServiceHook, { TransactionsService } from './useTransactionsService.hook';
import { DirectoriesService } from './useDirService.hook';
import { useDirService } from './index';
import usePriceManagementServiceHook, { PriceManagementService } from './usePriceManagementService.hook';
import useAppSettingsHook, { AppSettingsService } from './useAppSettings.hook';
import useCompaniesService, { CompaniesService } from './useCompaniesService.hook';
import { createContext, useContext, useEffect } from 'react';
import useWarehousesServiceHook, { WarehousesService } from './useWarehousesService.hook';
import useAppAuthHook, { AuthService } from './useAppAuth.hook';
import { ConfigService } from '../services';
import useOrdersServiceHook, { OrdersService } from './useOrdersService.hook';

export enum ServiceName {
  permissions = 'permissions',
  transactions = 'transactions',
  products = 'products',
  customRoles = 'customRoles',
  storage = 'storage',
  directories = 'directories',
  auth = 'auth',
  orders = 'orders',
  priceManagement = 'priceManagement',
  appSettings = 'appSettings',
  companies = 'companies',
  warehouses = 'warehouses',
}

export interface AppService {
  [ServiceName.permissions]: PermissionService;
  [ServiceName.products]: ProductsService;
  [ServiceName.transactions]: TransactionsService;
  [ServiceName.directories]: DirectoriesService;
  [ServiceName.priceManagement]: PriceManagementService;
  [ServiceName.appSettings]: AppSettingsService;
  [ServiceName.companies]: CompaniesService;
  [ServiceName.warehouses]: WarehousesService;
  [ServiceName.auth]: AuthService;
  [ServiceName.orders]: OrdersService;
}
const isDevMode = ConfigService.isDevMode();
const useAppService = (): AppService => {
  const auth = useAppAuthHook();
  const permissions = usePermissionsServiceHook();
  const products = useProductsServiceHook();
  const transactions = useTransactionsServiceHook();
  const directories = useDirService();
  const priceManagement = usePriceManagementServiceHook();
  const appSettings = useAppSettingsHook();
  const companies = useCompaniesService();
  const warehouses = useWarehousesServiceHook();
  const orders = useOrdersServiceHook();

  useEffect(() => {
    isDevMode && console.log('Apply useAppService | permissions');
  }, [permissions]);
  useEffect(() => {
    isDevMode && console.log('Apply useAppService | products');
  }, [products]);
  useEffect(() => {
    isDevMode && console.log('Apply useAppService | transactions');
  }, [transactions]);
  useEffect(() => {
    isDevMode && console.log('Apply useAppService | directories');
  }, [directories]);
  useEffect(() => {
    isDevMode && console.log('Apply useAppService | priceManagement');
  }, [priceManagement]);
  useEffect(() => {
    isDevMode && console.log('Apply useAppService | appSettings');
  }, [appSettings]);
  useEffect(() => {
    isDevMode && console.log('Apply useAppService | companies');
  }, [companies]);
  useEffect(() => {
    isDevMode && console.log('Apply useAppService | warehouses');
  }, [warehouses]);

  return {
    auth,
    permissions,
    appSettings,
    companies,
    transactions,
    directories,
    products,
    priceManagement,
    warehouses,
    orders,
  };
};
export const AppServiceCTX = createContext<AppService>({} as AppService);

export const useAppServiceProvider = () => useContext(AppServiceCTX);

export const AppServiceProvider = ({ children }: { children?: React.ReactNode; isDevMode?: boolean }) => {
  const appService = useAppService();

  return <AppServiceCTX.Provider value={appService}>{children}</AppServiceCTX.Provider>;
};
export default AppServiceProvider;
