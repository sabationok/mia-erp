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
}

const useAppService = (): AppService => {
  const permissions = usePermissionsServiceHook();
  const products = useProductsServiceHook();
  const transactions = useTransactionsServiceHook();
  const directories = useDirService();
  const priceManagement = usePriceManagementServiceHook();
  const appSettings = useAppSettingsHook();
  const companies = useCompaniesService();
  const warehouses = useWarehousesServiceHook();

  useEffect(() => {
    console.log('Apply useAppService | permissions');
  }, [permissions]);
  useEffect(() => {
    console.log('Apply useAppService | products');
  }, [products]);
  useEffect(() => {
    console.log('Apply useAppService | transactions');
  }, [transactions]);
  useEffect(() => {
    console.log('Apply useAppService | directories');
  }, [directories]);
  useEffect(() => {
    console.log('Apply useAppService | priceManagement');
  }, [priceManagement]);
  useEffect(() => {
    console.log('Apply useAppService | appSettings');
  }, [appSettings]);
  useEffect(() => {
    console.log('Apply useAppService | companies');
  }, [companies]);
  useEffect(() => {
    console.log('Apply useAppService | warehouses');
  }, [warehouses]);

  return {
    permissions,
    transactions,
    products,
    priceManagement,
    directories,
    appSettings,
    companies,
    warehouses,
  };
};
export const AppServiceCTX = createContext<AppService>({} as AppService);

export const useAppServiceProvider = () => useContext(AppServiceCTX);

export const AppServiceProvider = ({ children }: { children?: React.ReactNode }) => {
  const appService = useAppService();

  return <AppServiceCTX.Provider value={appService}>{children}</AppServiceCTX.Provider>;
};
export default useAppService;
