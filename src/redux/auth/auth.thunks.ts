import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import {
  IAuthState,
  ICurrentUser,
  ICurrentUserInfoRes,
  ILoggedUserInfo,
  ILoginUserData,
  IRegisteredUser,
  IRegisteredUserInfoRes,
  RegisterDto,
} from '../../types/auth.types';
import { ThunkArgs } from '../store.store';
import AuthApi from '../../api/auth.api';

export const registerUserThunk = createAsyncThunk<IRegisteredUser, ThunkArgs<RegisterDto>>(
  'auth/registerThunk',
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response: IRegisteredUserInfoRes = await AuthApi.register(data);

      onSuccess && onSuccess(response.data.data);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const logInUserThunk = createAsyncThunk<
  ILoggedUserInfo,
  ThunkArgs<ILoginUserData>,
  {
    state: { auth: IAuthState };
  }
>('auth/logInUserThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await AuthApi.logInUser(data as ILoginUserData);

    onSuccess && onSuccess(data);
    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const logOutUserThunk = createAsyncThunk<any, ThunkArgs>(
  'auth/logOutUserThunk',
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await AuthApi.logOutUser();
      onSuccess && onSuccess(response);
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk<
  ICurrentUser,
  ThunkArgs<
    {
      permissionId: string;
    },
    ICurrentUserInfoRes
  >
>('auth/getCurrentUserThunk', async ({ onSuccess, onError, onLoading, data }, thunkAPI) => {
  try {
    const response = await AuthApi.getCurrentUser();

    onSuccess && onSuccess(response);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
