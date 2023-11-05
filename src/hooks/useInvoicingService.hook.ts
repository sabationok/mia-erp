import { useAppDispatch } from '../redux/store.store';
import { useMemo } from 'react';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { defaultThunkPayload } from '../utils/fabrics';
import { getAllInvoiceMethodsThunk } from '../redux/invoices/invoicing.thunks';
import { IInvoicingMethodReqData } from '../redux/invoices/invoices.types';
import { IInvoicingMethod } from '../redux/integrations/integrations.types';

export interface UseInvoicingService {
  getAllMethods: ServiceDispatcherAsync<IInvoicingMethodReqData, IInvoicingMethod[]>;
}
const useInvoicingService = () => {
  const dispatch = useAppDispatch();

  return useMemo((): UseInvoicingService => {
    return {
      getAllMethods: args => dispatch(getAllInvoiceMethodsThunk(defaultThunkPayload(args))),
    };
  }, [dispatch]);
};
export default useInvoicingService;
