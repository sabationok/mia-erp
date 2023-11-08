import { ServiceDispatcherAsync } from '../redux/global.types';
import { IDeliveryMethodReqData } from '../redux/shipments/shipments.types';
import { useAppDispatch } from '../redux/store.store';
import { getAllDeliveryMethodsThunk } from '../redux/shipments/shipments.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { useMemo } from 'react';
import { IDeliveryMethod } from '../redux/integrations/integrations.types';

export interface UseShipmentsService {
  getAllMethods: ServiceDispatcherAsync<IDeliveryMethodReqData, IDeliveryMethod[]>;
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
