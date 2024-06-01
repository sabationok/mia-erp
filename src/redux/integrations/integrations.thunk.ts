import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppModuleName } from '../reduxTypes.types';
import { ExternalServiceTypeEnum, ExtServiceBase } from '../../types/integrations.types';
import { ThunkArgs } from '../store.store';
import { axiosErrorCheck } from '../../utils';
import { ExtServicesApi } from '../../api';

const IntegrationsThunkType = {
  getAllExtServices: `${AppModuleName.integrations}/getAllExtServicesThunk`,
};

export const getAllExtIntegrationServicesThunk = createAsyncThunk<
  { data: ExtServiceBase[] },
  ThunkArgs<{ params?: { type?: ExternalServiceTypeEnum } }, ExtServiceBase[]>
>(IntegrationsThunkType.getAllExtServices, async (arg, thunkAPI) => {
  arg?.onLoading && arg?.onLoading(true);
  try {
    const res = await ExtServicesApi.getExtServicesList(arg.data?.params);
    if (res) {
      arg.onSuccess && arg.onSuccess(res.data?.data);
    }
    return { ...res.data };
  } catch (e) {
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  } finally {
    arg?.onLoading && arg?.onLoading(false);
  }
});
