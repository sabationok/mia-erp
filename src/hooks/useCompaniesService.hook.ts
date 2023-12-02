import { ICompanyReqData } from '../types/companies.types';
import { IPermission } from '../types/permissions.types';
import { useMemo } from 'react';
import { CompaniesApi, createApiCall } from '../api';
import { defaultApiCallPayload } from '../utils';
import { ServiceApiCaller } from '../redux/global.types';

export interface CompaniesService {
  delete: ServiceApiCaller<string, Partial<IPermission>>;
  create: ServiceApiCaller<ICompanyReqData, IPermission>;
  update: ServiceApiCaller<Required<ICompanyReqData>, IPermission>;
}

const useCompaniesServiceHook = (): CompaniesService => {
  // const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): CompaniesService => {
    const { create, updateById, deleteById } = CompaniesApi;
    return {
      create: payload => createApiCall(defaultApiCallPayload(payload), create, CompaniesApi),
      update: payload => createApiCall(defaultApiCallPayload(payload), updateById, CompaniesApi),
      delete: payload => createApiCall(defaultApiCallPayload(payload), deleteById, CompaniesApi),
    };
  }, []);
};

export default useCompaniesServiceHook;
