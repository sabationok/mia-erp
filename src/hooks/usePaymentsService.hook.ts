import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { getAllPaymentMethodsThunk } from '../redux/payments/payments.thunks';
import { defaultThunkPayload } from '../utils';
import { IPaymentMethod, IPaymentMethodReqData } from '../types/integrations.types';

export interface UsePaymentsService {
  getAllMethods: ServiceDispatcherAsync<IPaymentMethodReqData, IPaymentMethod[]>;
}
const usePaymentsServiceHook = () => {
  const dispatch = useAppDispatch();

  return useMemo((): UsePaymentsService => {
    return {
      getAllMethods: args => dispatch(getAllPaymentMethodsThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};
export default usePaymentsServiceHook;
