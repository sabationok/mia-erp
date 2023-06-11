import { ServiceApiCaller } from '../global.types';
import { ICompany } from './companies.types';
import { AppDispatch, RootState, useAppDispatch } from '../store.store';
import { IPermission } from '../permissions/permissions.types';
import { useMemo } from 'react';
import { CompaniesApi, createApiCall } from '../../api';
import { defaultApiCallPayload } from '../../utils/fabrics';

export interface CompaniesService {
  dispatch: AppDispatch;
  state?: RootState;
  delete?: ServiceApiCaller<{ id: string }>;
  create?: ServiceApiCaller<Partial<ICompany>, IPermission>;
  update?: ServiceApiCaller<Partial<ICompany>, IPermission>;
}

const useCompaniesService = (): CompaniesService => {
  const dispatch: AppDispatch = useAppDispatch();

  const service = useMemo(
    (): Omit<CompaniesService, 'dispatch' | 'state'> => ({
      create: async payload => createApiCall(defaultApiCallPayload(payload), CompaniesApi.create),
      update: async payload => createApiCall(defaultApiCallPayload(payload), CompaniesApi.updateById),
      delete: async payload => createApiCall(defaultApiCallPayload(payload), CompaniesApi.deleteById),
    }),
    []
  );
  return { dispatch };
};

export default useCompaniesService as typeof useCompaniesService;
