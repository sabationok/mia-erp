import { ServiceDispatcherAsync } from '../redux/app-redux.types';
import { ICustomer, ICustomerReqDta } from '../types/customers.types';
import { useMemo } from 'react';
import { useAppDispatch } from '../redux/store.store';
import {
  createCustomerThunk,
  getAllCommunicationInvoiceMethodsThunk,
  getAllCustomersThunk,
  updateCommunicationMethodThunk,
  updateCustomerThunk,
} from '../redux/customers/customers.thunks';
import { defaultThunkPayload } from '../utils/fabrics';
import { AppQueryParams } from '../api';
import { ICommunicationMethod, ICommunicationMethodReqData } from '../types/integrations.types';

export interface CustomersService {
  create: ServiceDispatcherAsync<ICustomerReqDta, ICustomer>;
  getAll: ServiceDispatcherAsync<{ refresh?: boolean; params: AppQueryParams }, ICustomer[]>;
  update: ServiceDispatcherAsync<{ refresh?: boolean; data: ICustomerReqDta; params?: AppQueryParams }, ICustomer>;

  getAllMethods: ServiceDispatcherAsync<ICommunicationMethodReqData, ICommunicationMethod[]>;
  updateMethod: ServiceDispatcherAsync<ICommunicationMethodReqData, ICommunicationMethod>;
}
const useCustomersService = () => {
  const dispatch = useAppDispatch();
  return useMemo((): CustomersService => {
    return {
      create: args => dispatch(createCustomerThunk(defaultThunkPayload(args))),
      getAll: args => dispatch(getAllCustomersThunk(defaultThunkPayload(args))),
      update: args => dispatch(updateCustomerThunk(defaultThunkPayload(args))),

      getAllMethods: args => dispatch(getAllCommunicationInvoiceMethodsThunk(defaultThunkPayload(args))),
      updateMethod: arg => dispatch(updateCommunicationMethodThunk(defaultThunkPayload(arg))),
    };
  }, [dispatch]);
};
export default useCustomersService;
