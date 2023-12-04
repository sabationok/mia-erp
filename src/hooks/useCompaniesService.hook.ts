import { ICompany, ICompanyReqData } from '../types/companies.types';
import { IPermission } from '../types/permissions.types';
import { useMemo } from 'react';
import { CompaniesApi, createApiCall } from '../api';
import { defaultApiCallPayload } from '../utils';
import { ServiceApiCaller } from '../redux/global.types';

export interface CompaniesService {
  delete: ServiceApiCaller<string, Partial<IPermission>>;
  getById: ServiceApiCaller<{ _id?: string; params?: { fullInfo?: boolean; configs?: boolean } }, ICompany>;
  create: ServiceApiCaller<ICompanyReqData, IPermission>;
  update: ServiceApiCaller<Required<ICompanyReqData>, IPermission>;
}
const { create, updateById, deleteById, getById } = CompaniesApi;
const useCompaniesServiceHook = (): CompaniesService => {
  // const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): CompaniesService => {
    return {
      create: args => createApiCall(defaultApiCallPayload(args), create),
      update: args => createApiCall(defaultApiCallPayload(args), updateById),
      delete: args => createApiCall(defaultApiCallPayload(args), deleteById),
      getById: args => createApiCall(defaultApiCallPayload(args), getById),
    };
  }, []);
};

export default useCompaniesServiceHook;
