import { createAsyncThunk } from '@reduxjs/toolkit';
import AppSettingsApi from '../../api/appSettings.api';
import { ThunkPayload } from '../store.store';
import { RoleActionType } from '../app-redux.types';
import { axiosErrorCheck } from '../../utils';

export const getAppActionsThunk = createAsyncThunk<
  Record<string, RoleActionType[]>,
  ThunkPayload<any, Record<string, RoleActionType[]>>
>('appSettings/getAppActionsThunk', async ({ onLoading, onError, onSuccess }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const res = await AppSettingsApi.getAllActions();
    onSuccess && onSuccess(res.data.data);
    return res?.data.data;
  } catch (e) {
    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
