import { ServiceDispatcherAsync } from '../redux/global.types';
import { useAppDispatch } from '../redux/store.store';
import { getAllDeliveryMethodsThunk } from '../redux/shipments/shipments.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { useMemo } from 'react';
import { IDeliveryMethod } from '../types/integrations.types';

export interface UseShipmentsService {
  getAllMethods: ServiceDispatcherAsync<any, IDeliveryMethod[]>;
}

const useShipmentsService = (): UseShipmentsService => {
  const dispatch = useAppDispatch();

  return useMemo((): UseShipmentsService => {
    return {
      getAllMethods: args => dispatch(getAllDeliveryMethodsThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export default useShipmentsService;
