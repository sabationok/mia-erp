import { createSlice } from '@reduxjs/toolkit';
import { ICustomerBase } from '../../types/customers.types';
import { StateErrorType } from '../reduxTypes.types';
import {
  createCustomerThunk,
  getAllCommunicationInvoiceMethodsThunk,
  getAllCustomersThunk,
  updateCommunicationMethodThunk,
  updateCustomerThunk,
} from './customers.thunks';
import { ICommunicationMethod } from '../../types/integrations.types';
import { onUserLogout } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';

export interface CustomersState {
  customers: ICustomerBase[];
  current?: ICustomerBase;
  methods: ICommunicationMethod[];
  error: StateErrorType | null;
  isLoading: boolean;
}

const initialState: CustomersState = {
  customers: [],
  methods: [],
  error: null,
  isLoading: false,
};
export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllCustomersThunk.fulfilled, (s, a) => {
        if (a.payload?.refresh) {
          s.customers = a.payload?.data;
        } else {
          s.customers = [...a.payload?.data, ...s.customers];
        }
      })
      .addCase(createCustomerThunk.fulfilled, (s, a) => {
        s.customers.unshift(a.payload);
      })
      .addCase(updateCustomerThunk.fulfilled, (s, a) => {
        s.customers = s.customers.map(cmr => (cmr._id === a.payload.data._id ? a.payload.data : cmr));
      })
      .addCase(getAllCommunicationInvoiceMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updateCommunicationMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? a.payload : mtd));
      })
      .addMatcher(onUserLogout, sliceCleaner(initialState)),
});
