import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppModuleName } from '../reduxTypes.types';
import { ExtServiceBase } from './integrations.types';
import { ThunkPayload } from '../store.store';
import { axiosErrorCheck } from '../../utils';
import { ExtServicesApi } from '../../api';

const IntegrationsThunkType = {
  getAllExtServices: `${AppModuleName.integrations}/getAllExtServicesThunk`,
};

export const getAllExtIntegrationServicesThunk = createAsyncThunk<
  { data: ExtServiceBase[] },
  ThunkPayload<any, ExtServiceBase[]>
>(IntegrationsThunkType.getAllExtServices, async (arg, thunkAPI) => {
  arg?.onLoading && arg?.onLoading(true);
  try {
    const res = await ExtServicesApi.getAllExtServices();
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
