import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { __ServiceDispatcherAsync, _ServiceApiCaller, ServiceApiCaller } from '../redux/app-redux.types';
import { defaultApiCallPayload } from '../utils';
import { Connection } from '../types/integrations.types';
import { getAllExternalServicesThunk } from '../redux/integrations/integrations.thunk';
import { apiCall, ConnectionsApi } from '../api';

export interface UseConnectionsService {
  getAllExtServices: __ServiceDispatcherAsync<typeof getAllExternalServicesThunk>;
  getAll: ServiceApiCaller<ConnectionsApi.GetAllQuery, (Connection.Output.Entity | Connection.Input.Entity)[]>;
  createInput: _ServiceApiCaller<typeof ConnectionsApi.Client.input.create>;
  createOutput: _ServiceApiCaller<typeof ConnectionsApi.Client.output.create>;
}
const useConnectionsService = () => {
  const dispatch = useAppDispatch();
  return useMemo((): UseConnectionsService => {
    const { getAll, input, output } = ConnectionsApi.Client;
    return {
      getAllExtServices: args => dispatch(getAllExternalServicesThunk(args)),
      getAll: args => apiCall(getAll, defaultApiCallPayload(args)),
      createInput: args => apiCall(input.create, { data: args, params: args?.params }),
      createOutput: args => apiCall(output.create, { data: args, params: args?.params }),
    };
  }, [dispatch]);
};
export default useConnectionsService;
