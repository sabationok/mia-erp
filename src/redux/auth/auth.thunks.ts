import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import {
  IAuthState,
  ICurrentUser,
  ICurrentUserInfoRes,
  ILoggedUserInfo,
  IRegisteredUser,
  LoginUserDto,
  RegisterDto,
} from '../../types/auth.types';
import { ThunkArgs } from '../store.store';
import AuthApi from '../../api/auth.api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

export enum AuthThunkTypeEnum {
  register = 'auth/registerThunk',
  logIn = 'auth/logInUserThunk',
  logOut = 'auth/logOutUserThunk',
  getCurrent = 'auth/getCurrentUserThunk',
}

export const registerUserThunk = createAppAsyncThunk<IRegisteredUser, ThunkArgs<RegisterDto>>(
  AuthThunkTypeEnum.register,
  AuthApi.register
);

export const logInUserThunk = createAsyncThunk<
  ILoggedUserInfo,
  ThunkArgs<LoginUserDto>,
  {
    state: { auth: IAuthState };
  }
>(AuthThunkTypeEnum.logIn, async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await AuthApi.logInUser(data as LoginUserDto);

    onSuccess && onSuccess(data);
    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const logOutUserThunk = createAsyncThunk<any, ThunkArgs>(
  AuthThunkTypeEnum.logOut,
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
>(AuthThunkTypeEnum.getCurrent, async ({ onSuccess, onError, onLoading, data }, thunkAPI) => {
  try {
    const response = await AuthApi.getCurrentUser();

    onSuccess && onSuccess(response);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
