import { createSlice } from '@reduxjs/toolkit';
import { ICustomer } from './customers.types';
import { StateErrorType } from '../reduxTypes.types';
import { createCustomerThunk, getAllCustomersThunk } from './customers.thunks';

export interface CustomersState {
  customers: ICustomer[];
  current?: ICustomer;
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
      .addCase(createCustomerThunk.fulfilled, (s, a) => {
        s.customers.unshift(a.payload);
      })
      .addCase(getAllCustomersThunk.fulfilled, (s, a) => {
        if (a.payload?.refresh) {
          s.customers = a.payload?.data;
        } else {
          s.customers = [...a.payload?.data, ...s.customers];
        }
      }),
});
