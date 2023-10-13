import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICustomer, ICustomerReqDta } from './customers.types';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, CustomersApi } from '../../api';
import { axiosErrorCheck } from '../../utils';

enum CustomersThunkTypeEnum {
  create = 'customers/createCustomerThunk',
  getAll = 'customers/getAllCustomersThunk',
}
export const createCustomerThunk = createAsyncThunk<ICustomer, ThunkPayload<ICustomerReqDta, ICustomer>>(
  CustomersThunkTypeEnum.create,
  async (arg, thunkAPI) => {
    try {
      const res = await CustomersApi.create(arg.data);
      if (res) {
        arg?.onSuccess && arg?.onSuccess(res?.data?.data);
      }

      return res?.data?.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(axiosErrorCheck(e));
    }
  }
);
export const getAllCustomersThunk = createAsyncThunk<
  { refresh?: boolean; data: ICustomer[] },
  ThunkPayload<{ refresh?: boolean; params: AppQueryParams }, ICustomer[]>
>(CustomersThunkTypeEnum.getAll, async (arg, thunkAPI) => {
  try {
    const res = await CustomersApi.getAllByQueries(arg.data?.params);
    if (res) {
      arg?.onSuccess && arg?.onSuccess(res?.data?.data);
    }

    return { data: res?.data?.data, refresh: arg.data?.refresh };
  } catch (e) {
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
