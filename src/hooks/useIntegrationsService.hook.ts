import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { __ServiceDispatcherAsync, _ServiceApiCaller } from '../redux/app-redux.types';
import { getAllExternalServicesThunk, getAllIntegrationsByTypeThunk } from '../redux/integrations/integrations.thunk';
import { apiCall, ConnectionsApi } from '../api';

export interface UseConnectionsService {
  getAllExtServices: __ServiceDispatcherAsync<typeof getAllExternalServicesThunk>;
  getAll: __ServiceDispatcherAsync<typeof getAllIntegrationsByTypeThunk>;
  createInput: _ServiceApiCaller<typeof ConnectionsApi.Client.input.create>;
  createOutput: _ServiceApiCaller<typeof ConnectionsApi.Client.output.create>;
}
const useConnectionsService = () => {
  const dispatch = useAppDispatch();
  return useMemo((): UseConnectionsService => {
    const { input, output } = ConnectionsApi.Client;
    return {
      getAllExtServices: args => dispatch(getAllExternalServicesThunk(args)),
      getAll: args => dispatch(getAllIntegrationsByTypeThunk(args)),
      createInput: args => apiCall(input.create, { data: args, params: args?.params }),
      createOutput: args => apiCall(output.create, { data: args, params: args?.params }),
    };
  }, [dispatch]);
};
export default useConnectionsService;
