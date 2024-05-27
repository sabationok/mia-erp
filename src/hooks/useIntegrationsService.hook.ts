import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceApiCaller, ServiceDispatcherAsync } from '../redux/app-redux.types';
import { defaultApiCallPayload, defaultThunkPayload } from '../utils/fabrics';
import {
  ExternalServiceTypeEnum,
  ExtServiceBase,
  InputIntegrationBase,
  InputIntegrationDto,
  OutputIntegrationBase,
  OutputIntegrationDto,
} from '../types/integrations.types';
import { getAllExtIntegrationServicesThunk } from '../redux/integrations/integrations.thunk';
import { createApiCall, IntegrationsApi } from '../api';
import { GetAllIntegrationsQueries } from '../api/integrations.api';

export interface UseIntegrationsService {
  getAllExtServices: ServiceDispatcherAsync<{ params?: { type?: ExternalServiceTypeEnum } }, ExtServiceBase[]>;
  getAll: ServiceApiCaller<GetAllIntegrationsQueries, (OutputIntegrationBase | InputIntegrationBase)[]>;
  createInput: ServiceApiCaller<{ data: InputIntegrationDto }, InputIntegrationBase>;
  createOutput: ServiceApiCaller<{ data: OutputIntegrationDto }, OutputIntegrationBase>;
}
const useIntegrationsService = () => {
  const dispatch = useAppDispatch();
  return useMemo((): UseIntegrationsService => {
    const { getAllByQueries, createOutputIntegration, createInputIntegration } = IntegrationsApi;
    return {
      getAllExtServices: args => dispatch(getAllExtIntegrationServicesThunk(defaultThunkPayload(args))),
      getAll: args => createApiCall(defaultApiCallPayload(args), getAllByQueries, IntegrationsApi),
      createInput: args => createApiCall(defaultApiCallPayload(args), createInputIntegration, IntegrationsApi),
      createOutput: args => createApiCall(defaultApiCallPayload(args), createOutputIntegration, IntegrationsApi),
    };
  }, [dispatch]);
};
export default useIntegrationsService;
