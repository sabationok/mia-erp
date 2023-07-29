import usePermissionsServiceHook, { PermissionService } from '../redux/permissions/usePermissionsService.hook';
import useStorageServiceHook, { StorageService } from '../redux/products/useStorageService.hook';
import useTransactionsServiceHook, { TransactionsService } from '../redux/transactions/useTransactionsService.hook';
import { DirectoriesService } from './useDirService.hook';
import { useDirService } from './index';
import usePriceManagementServiceHook, { PriceManagementService } from './usePriceManagementService.hook';
import useAppSettingsHook, { AppSettingsService } from './useAppSettings.hook';
import useCompaniesService, { CompaniesService } from './useCompaniesService.hook';
import { createContext, useContext, useEffect } from 'react';

export enum ServiceName {
  permissions = 'permissions',
  transactions = 'transactions',
  products = 'products',
  customRoles = 'customRoles',
  storage = 'storage',
  directories = 'directories',
  auth = 'auth',
  priceManagement = 'priceManagement',
  appSettings = 'appSettings',
  companies = 'companies',
}

export interface AppService {
  [ServiceName.permissions]: PermissionService;
  [ServiceName.products]: StorageService;
  [ServiceName.transactions]: TransactionsService;
  [ServiceName.directories]: DirectoriesService;
  [ServiceName.priceManagement]: PriceManagementService;
  [ServiceName.appSettings]: AppSettingsService;
  [ServiceName.companies]: CompaniesService;
}

const useAppService = (): AppService => {
  const permissions = usePermissionsServiceHook();
  const products = useStorageServiceHook();
  const transactions = useTransactionsServiceHook();
  const directories = useDirService();
  const priceManagement = usePriceManagementServiceHook();
  const appSettings = useAppSettingsHook();
  const companies = useCompaniesService();

  useEffect(() => {
    console.log('Apply useAppService');
  }, [permissions, products, transactions, directories, priceManagement, appSettings, companies]);

  return {
    [ServiceName.permissions]: permissions,
    [ServiceName.transactions]: transactions,
    [ServiceName.products]: products,
    [ServiceName.priceManagement]: priceManagement,
    [ServiceName.directories]: directories,
    [ServiceName.appSettings]: appSettings,
    [ServiceName.companies]: companies,
  };
};
export const AppServiceCTX = createContext<AppService>({} as AppService);

export const useAppServiceProvider = () => useContext(AppServiceCTX);

export const AppServiceProvider = ({ children }: { children?: React.ReactNode }) => {
  const appService = useAppService();

  return <AppServiceCTX.Provider value={appService}>{children}</AppServiceCTX.Provider>;
};
export default useAppService;
