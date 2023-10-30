import { ServiceDispatcherAsync } from '../redux/global.types';
import { IShipmentMethodReqData } from '../redux/shipments/shipments.types';
import { useAppDispatch } from '../redux/store.store';
import { getAllShipmentMethodsThunk } from '../redux/shipments/shipments.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { useMemo } from 'react';
import { IShipmentMethod } from '../redux/integrations/integrations.types';

export interface UseShipmentsService {
  getAllMethods: ServiceDispatcherAsync<IShipmentMethodReqData, IShipmentMethod[]>;
}

const useShipmentsService = (): UseShipmentsService => {
  const dispatch = useAppDispatch();

  return useMemo((): UseShipmentsService => {
    return {
      getAllMethods: args => dispatch(getAllShipmentMethodsThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};

export default useShipmentsService;
