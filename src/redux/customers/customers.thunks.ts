import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerEntity, ICustomerReqDta } from '../../types/customers.types';
import { ThunkArgs } from '../store.store';
import { ApiQueryParams, CommunicationApi, CustomersApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { ICommunicationMethod, ICommunicationMethodReqData } from '../../types/integrations.types';
import { AxiosResponse } from 'axios';
import { AppResponseType } from '../app-redux.types';

enum CustomersThunkTypeEnum {
  create = 'customers/createCustomerThunk',
  getAll = 'customers/getAllCustomersThunk',
  update = 'customers/updateCustomerThunk',

  getAllMethods = 'customers/getAllMethodsThunk',
  updateMethod = 'customers/updateMethodThunk',

  getAllSources = 'customers/getAllSourcesThunk',
  updateSource = 'customers/updateSourceThunk',
}

export const asyncThunkPayloadCreatorWrapper =
  <Return extends AppResponseType = any, Arg extends ThunkArgs = any>(
    getResponse: () => Promise<AxiosResponse<Return>>
  ): AsyncThunkPayloadCreator<Return, Arg> =>
  async (arg, thunkAPI) => {
    try {
      const res = await getResponse();
      if (res) {
        arg?.onSuccess && arg?.onSuccess(res?.data?.data);
      }

      return res?.data?.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(axiosErrorCheck(e));
    }
  };

export const createCustomerThunk = createAsyncThunk<CustomerEntity, ThunkArgs<ICustomerReqDta, CustomerEntity>>(
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
export const updateCustomerThunk = createAsyncThunk<
  { data: CustomerEntity; refresh?: boolean },
  ThunkArgs<{ data: ICustomerReqDta; refresh?: boolean }, CustomerEntity>
>(CustomersThunkTypeEnum.update, async (arg, thunkAPI) => {
  console.log('updateCustomerThunk');

  try {
    const res = await CustomersApi.update(arg?.data?.data);

    if (res) {
      arg?.onSuccess && arg?.onSuccess(res?.data?.data);
    }

    return { data: res?.data?.data, refresh: true };
  } catch (e) {
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
export const getAllCustomersThunk = createAsyncThunk<
  { refresh?: boolean; data: CustomerEntity[] },
  ThunkArgs<{ refresh?: boolean; params: ApiQueryParams }, CustomerEntity[]>
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

export const getAllCommunicationInvoiceMethodsThunk = createAsyncThunk<
  ICommunicationMethod[],
  ThunkArgs<unknown, ICommunicationMethod[]>
>(CustomersThunkTypeEnum.getAllMethods, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await CommunicationApi.getAllMethods();
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
export const updateCommunicationMethodThunk = createAsyncThunk<
  ICommunicationMethod,
  ThunkArgs<ICommunicationMethodReqData, ICommunicationMethod>
>(CustomersThunkTypeEnum.updateMethod, async (args, thunkAPI) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await CommunicationApi.updateMethod(args?.data || {});
    res && args?.onSuccess && args?.onSuccess(res?.data?.data);

    args?.onLoading && args?.onLoading(false);
    return res?.data?.data;
  } catch (e) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(e);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
