import { CompanyEntity, ICompanyReqData } from '../types/companies.types';
import { PermissionEntity } from '../types/permissions.types';
import { useMemo } from 'react';
import { CompaniesApi, createApiCall } from '../api';
import { defaultApiCallPayload, defaultThunkPayload } from '../utils';
import { ServiceApiCaller, ServiceDispatcherAsync } from '../redux/app-redux.types';
import { useAppDispatch } from '../redux/store.store';
import { getCompanyByIdThunk, updateCompanyByIdThunk } from '../redux/companies/companies.thunks';

export interface CompaniesService {
  delete: ServiceApiCaller<string, Partial<PermissionEntity>>;
  getById: ServiceDispatcherAsync<{ _id?: string; params?: { fullInfo?: boolean; configs?: boolean } }, CompanyEntity>;
  create: ServiceApiCaller<ICompanyReqData, PermissionEntity>;
  update: ServiceDispatcherAsync<ICompanyReqData, PermissionEntity>;
}
const { create, deleteById } = CompaniesApi;
const useCompaniesServiceHook = (): CompaniesService => {
  const dispatch = useAppDispatch();

  return useMemo((): CompaniesService => {
    return {
      create: args => createApiCall(defaultApiCallPayload(args), create),
      update: args => dispatch(updateCompanyByIdThunk(defaultThunkPayload(args))),
      delete: args => createApiCall(defaultApiCallPayload(args), deleteById),
      getById: args => dispatch(getCompanyByIdThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export default useCompaniesServiceHook;
