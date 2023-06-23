import { ICompany, ICompanyReqData } from './companies.types';
import { AppDispatch, useAppDispatch } from '../store.store';
import { IPermission } from '../permissions/permissions.types';
import { useMemo } from 'react';
import { CompaniesApi, createApiCall } from '../../api';
import { defaultApiCallPayload } from '../../utils/fabrics';
import { ApiCaller } from '../../api/createApiCall.api';

export interface CompaniesService {
  dispatch: AppDispatch;
  delete?: ApiCaller<string, Partial<IPermission>>;
  create?: ApiCaller<Partial<ICompany>, IPermission>;
  update?: ApiCaller<Required<ICompanyReqData>, IPermission>;
}

const useCompaniesService = (): CompaniesService => {
  const dispatch: AppDispatch = useAppDispatch();

  const service = useMemo((): Omit<CompaniesService, 'dispatch'> => {
    const { create, updateById, deleteById } = CompaniesApi;
    return {
      create: async payload => createApiCall(defaultApiCallPayload(payload), create, CompaniesApi),
      update: async payload => createApiCall(defaultApiCallPayload(payload), updateById, CompaniesApi),
      delete: async payload => createApiCall(defaultApiCallPayload(payload), deleteById, CompaniesApi),
    };
  }, []);
  return { dispatch, ...service };
};

export default useCompaniesService as typeof useCompaniesService;
