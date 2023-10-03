import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from '../../utils';
import { ThunkPayload } from '../store.store';
import { ICompanyConfigs, ICompanyConfigsDto } from './companies.types';
import { CompaniesApi } from '../../api';

enum CompanyThunkType {
  setConfigs = 'company/setConfigsThunk',
  getConfigs = 'company/getConfigsThunk',
}

export const createSetCompanyConfigsThunk = (type: string) =>
  createAsyncThunk<
    {
      refreshCurrent?: boolean;
      data: ICompanyConfigs;
    },
    ThunkPayload<
      {
        refreshCurrent?: boolean;
        data: ICompanyConfigsDto;
      },
      ICompanyConfigs
    >
  >(type, async (args, thunkAPI) => {
    args?.onLoading && args?.onLoading(true);

    try {
      const res = await CompaniesApi.setConfigs(args?.data?.data);
      if (res) {
        args?.onSuccess && args?.onSuccess(res?.data?.data, res?.data?.meta);
      }
      args?.onLoading && args?.onLoading(false);

      return { refreshCurrent: args?.data?.refreshCurrent, data: res?.data?.data };
    } catch (e) {
      args?.onError && args?.onError(e);
      args?.onLoading && args?.onLoading(false);
      return thunkAPI.rejectWithValue(axiosErrorCheck(e));
    }
  });

export const createGetCompanyConfigsThunk = (type: string) =>
  createAsyncThunk<
    {
      refreshCurrent?: boolean;
      data: ICompanyConfigs;
    },
    ThunkPayload<{ refreshCurrent?: boolean }, ICompanyConfigs>
  >(type, async (args, thunkAPI) => {
    args?.onLoading && args?.onLoading(true);
    try {
      const res = await CompaniesApi.getConfigs();
      if (res) {
        args?.onSuccess && args?.onSuccess(res?.data?.data, res?.data?.meta);
      }
      args?.onLoading && args?.onLoading(false);
      return { refreshCurrent: args?.data?.refreshCurrent, data: res?.data?.data };
    } catch (e) {
      args?.onError && args?.onError(e);
      args?.onLoading && args?.onLoading(false);
      return thunkAPI.rejectWithValue(axiosErrorCheck(e));
    }
  });
