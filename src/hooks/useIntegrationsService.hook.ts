import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { __ServiceDispatcherAsync, _ServiceApiCaller, ServiceApiCaller } from '../redux/app-redux.types';
import { defaultApiCallPayload } from '../utils';
import { Integration } from '../types/integrations.types';
import { getAllExternalServicesThunk } from '../redux/integrations/integrations.thunk';
import { apiCall, IntegrationsApi } from '../api';

export interface UseIntegrationsService {
  getAllExtServices: __ServiceDispatcherAsync<typeof getAllExternalServicesThunk>;
  getAll: ServiceApiCaller<IntegrationsApi.GetAllQuery, (Integration.Output.Entity | Integration.Input.Entity)[]>;
  createInput: ServiceApiCaller<
    { data: Integration.Input.CreateDto; params?: { setAsDefault?: boolean } },
    Integration.Input.Entity
  >;

  createOutput: _ServiceApiCaller<typeof IntegrationsApi.Client.output.create>;
}
const useIntegrationsService = () => {
  const dispatch = useAppDispatch();
  return useMemo((): UseIntegrationsService => {
    const { getAll, input, output } = IntegrationsApi.Client;
    return {
      getAllExtServices: args => dispatch(getAllExternalServicesThunk(args)),
      getAll: args => apiCall(getAll, defaultApiCallPayload(args)),
      createInput: args => apiCall(input.create, defaultApiCallPayload(args)),
      createOutput: args => apiCall(output.create, { data: args, params: args?.params }),
    };
  }, [dispatch]);
};
export default useIntegrationsService;
