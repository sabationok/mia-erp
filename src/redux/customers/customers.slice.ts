import { createSlice } from '@reduxjs/toolkit';
import { ICustomerBase } from './customers.types';
import { StateErrorType } from '../reduxTypes.types';
import { createCustomerThunk, getAllCustomersThunk, updateCustomerThunk } from './customers.thunks';

export interface CustomersState {
  customers: ICustomerBase[];
  current?: ICustomerBase;
  error: StateErrorType | null;
  isLoading: boolean;
}

const initialState: CustomersState = {
  customers: [],
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
      }),
});
