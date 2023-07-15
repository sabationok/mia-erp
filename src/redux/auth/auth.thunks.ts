import baseApi from 'api/baseApi';
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
  IRegistrationData,
} from './auth.types';
import { AxiosResponse } from 'axios';
import { ThunkPayload } from '../store.store';
import AuthApi from '../../api/auth.api';

const AUTH_API_BASENAME = '/auth';
export const authApiRoutes = {
  getAll: `${AUTH_API_BASENAME}/getAll`,
  getById: (id: string) => `${AUTH_API_BASENAME}/getById/${id}`,
  signUp: `${AUTH_API_BASENAME}/signUp`,
  signIn: `${AUTH_API_BASENAME}/signIn`,
  signOut: `${AUTH_API_BASENAME}/signOut`,
  getCurrentUser: (id: string) => `${AUTH_API_BASENAME}/getCurrentUser/${id}`,
  getCurrentUserInfo: (id: string) => `${AUTH_API_BASENAME}/getCurrentUserInfo/${id}`,
};

export const registerUserThunk = createAsyncThunk<IRegisteredUser, ThunkPayload<IRegistrationData>>(
  'auth/registerUserThunk',
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response: IRegisteredUserInfoRes = await baseApi.post(authApiRoutes.signUp, data);

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
  ThunkPayload<ILoginUserData>,
  {
    state: { auth: IAuthState };
  }
>('auth/logInUserThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await AuthApi.logInUser(data as ILoginUserData);

    onSuccess && onSuccess(data);
    return response.data.data;
    // return { accessToken: 'accessToken_', email: data?.email };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const logOutUserThunk = createAsyncThunk<any, ThunkPayload>(
  'auth/logOutUserThunk',
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response: AxiosResponse<any> = await baseApi.post(authApiRoutes.signOut);
      onSuccess && onSuccess(response);
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk<
  ICurrentUser,
  ThunkPayload<
    {
      permissionId: string;
    },
    ICurrentUserInfoRes
  >
>('auth/getCurrentUserThunk', async ({ onSuccess, onError, onLoading, data }, thunkAPI) => {
  try {
    const response: ICurrentUserInfoRes = await baseApi.get(authApiRoutes.getCurrentUser(data?.permissionId || ''));

    onSuccess && onSuccess(response);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
