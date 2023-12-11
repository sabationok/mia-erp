import { ICompany, ICompanyReqData } from '../types/companies.types';
import { IPermission } from '../types/permissions.types';
import { useMemo } from 'react';
import { CompaniesApi, createApiCall } from '../api';
import { defaultApiCallPayload, defaultThunkPayload } from '../utils';
import { ServiceApiCaller, ServiceDispatcherAsync } from '../redux/global.types';
import { useAppDispatch } from '../redux/store.store';
import { getCompanyByIdThunk, updateCompanyByIdThunk } from '../redux/companies/companies.thunks';

export interface CompaniesService {
  delete: ServiceApiCaller<string, Partial<IPermission>>;
  getById: ServiceDispatcherAsync<{ _id?: string; params?: { fullInfo?: boolean; configs?: boolean } }, ICompany>;
  create: ServiceApiCaller<ICompanyReqData, IPermission>;
  update: ServiceDispatcherAsync<ICompanyReqData, IPermission>;
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
