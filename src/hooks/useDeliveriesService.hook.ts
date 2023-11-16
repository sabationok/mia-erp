import { ServiceDispatcherAsync } from '../redux/global.types';
import { useAppDispatch } from '../redux/store.store';
import { defaultThunkPayload } from '../utils/fabrics';
import { useMemo } from 'react';
import { IDeliveryMethod } from '../redux/integrations/integrations.types';
import { IDeliveryMethodReqData } from '../redux/deliveries/deliveries.types';
import { getAllDeliveryMethodsThunk } from '../redux/deliveries/deliveries.thunks';

export interface UseDeliveriesService {
  getAllMethods: ServiceDispatcherAsync<IDeliveryMethodReqData, IDeliveryMethod[]>;
}

const useDeliveriesService = (): UseDeliveriesService => {
  const dispatch = useAppDispatch();

  return useMemo((): UseDeliveriesService => {
    return {
      getAllMethods: args => dispatch(getAllDeliveryMethodsThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export default useDeliveriesService;
