import { ICompanyReqData } from '../types/companies/companies.types';
import { PermissionEntity } from '../types/permissions.types';
import { useMemo } from 'react';
import { CompaniesApi, createApiCall } from '../api';
import { defaultApiCallPayload, defaultThunkPayload } from '../utils';
import { useAppDispatch } from '../redux/store.store';
import { __ServiceDispatcherAsync, ServiceApiCaller } from '../redux/app-redux.types';
import { getOneCompanyThunk, updateCompanyByIdThunk } from '../redux/companies/companies.thunks';

export interface CompaniesService {
  delete: ServiceApiCaller<string, Partial<PermissionEntity>>;
  create: ServiceApiCaller<ICompanyReqData, PermissionEntity>;

  getOne: __ServiceDispatcherAsync<typeof getOneCompanyThunk>;
  update: __ServiceDispatcherAsync<typeof updateCompanyByIdThunk>;
}
const { create, delete: delOne } = CompaniesApi;
const useCompaniesServiceHook = (): CompaniesService => {
  const dispatch = useAppDispatch();

  return useMemo((): CompaniesService => {
    return {
      create: args => createApiCall(defaultApiCallPayload(args), create),
      update: args => dispatch(updateCompanyByIdThunk(defaultThunkPayload(args))),
      getOne: args => dispatch(getOneCompanyThunk(args)),
      delete: args => createApiCall(defaultApiCallPayload(args), delOne),
    };
  }, [dispatch]);
};

export default useCompaniesServiceHook;
