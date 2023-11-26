import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { ICheckoutPaymentMethod, IPaymentMethodReqData } from '../types/payments.types';
import { getAllPaymentMethodsThunk } from '../redux/payments/payments.thunks';
import { defaultThunkPayload } from '../utils/fabrics';

export interface UsePaymentsService {
  getAllMethods: ServiceDispatcherAsync<IPaymentMethodReqData, ICheckoutPaymentMethod[]>;
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
