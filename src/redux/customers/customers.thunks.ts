import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import { ICustomer, ICustomerReqDta } from '../../types/customers.types';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, CommunicationApi, CustomersApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { ICommunicationMethod, ICommunicationMethodReqData } from '../../types/integrations.types';
import { AxiosResponse } from 'axios';
import { AppResponseType } from '../global.types';

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
  <Return extends AppResponseType = any, Arg extends ThunkPayload = any>(
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
export const updateCustomerThunk = createAsyncThunk<
  { data: ICustomer; refresh?: boolean },
  ThunkPayload<{ data: ICustomerReqDta; refresh?: boolean }, ICustomer>
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

export const getAllCommunicationInvoiceMethodsThunk = createAsyncThunk<
  ICommunicationMethod[],
  ThunkPayload<unknown, ICommunicationMethod[]>
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
  ThunkPayload<ICommunicationMethodReqData, ICommunicationMethod>
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
