import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { defaultThunkPayload } from '../utils/fabrics';
import { ExtServiceBase } from '../redux/integrations/integrations.types';
import { getAllExtIntegrationServicesThunk } from '../redux/integrations/integrations.thunk';

export interface UseIntegrationsService {
  getAllExtServices: ServiceDispatcherAsync<{ params?: {} }, ExtServiceBase[]>;
}
const useIntegrationsService = () => {
  const dispatch = useAppDispatch();

  return useMemo((): UseIntegrationsService => {
    return {
      getAllExtServices: args => dispatch(getAllExtIntegrationServicesThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};
export default useIntegrationsService;
