import { ServiceDispatcherAsync } from '../../redux/app-redux.types';
import { useAppDispatch } from '../../redux/store.store';
import { defaultThunkPayload } from '../../utils/fabrics';
import { useMemo } from 'react';
import { IDeliveryMethod, IDeliveryMethodReqData } from '../../types/integrations.types';
import { getAllDeliveryMethodsThunk, updateDeliveryMethodThunk } from '../../redux/deliveries/deliveries.thunks';

export interface UseDeliveriesService {
  getAllMethods: ServiceDispatcherAsync<IDeliveryMethodReqData, IDeliveryMethod[]>;
  update: ServiceDispatcherAsync<IDeliveryMethodReqData, IDeliveryMethod>;
}

const useDeliveriesService = (): UseDeliveriesService => {
  const dispatch = useAppDispatch();

  return useMemo((): UseDeliveriesService => {
    return {
      getAllMethods: args => dispatch(getAllDeliveryMethodsThunk(defaultThunkPayload(args))),
      update: args => dispatch(updateDeliveryMethodThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export default useDeliveriesService;
