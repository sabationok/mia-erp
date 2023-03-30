import baseApi from 'api/baseApi';
import { token } from 'api/baseApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { axiosErrorCheck } from 'utils';
import { IAuthState, IUser } from './auth.slice';
import { RootState } from 'redux/store.store';

const AUTH_API_BASENAME = '/auth';
export const authApiRoutes = {
  getAll: `${AUTH_API_BASENAME}/getAll`,
  getById: `${AUTH_API_BASENAME}/getById`,
  signUp: `${AUTH_API_BASENAME}/signUp`,
  signIn: `${AUTH_API_BASENAME}/signIn`,
  signOut: `${AUTH_API_BASENAME}/signOut`,
  getCurrentUser: `${AUTH_API_BASENAME}/getCurrentUser`,
  getCurrentUserInfo: `${AUTH_API_BASENAME}/getCurrentUserInfo`,
};

export interface ILoggedUserInfo {
  accessToken: string;
  email: string;
}
export interface IRegisteredUser {
  email: string;
}
export interface IRegistrationData {
  email: string;
  password: string;
}
export interface IPayloadRegisterUser {
  submitData: IRegistrationData;
  onSuccess: (regUserData?: any) => void | IRegisteredUser;
  onError(error?: AuthErrorType): void;
}
export interface IPayloadLogInUser {
  submitData: { email: string; password: string };
  onSuccess(data?: ILoggedUserInfo): void | ILoggedUserInfo;
  onError(error: AuthErrorType): void;
}
export interface IPayloadLogOutUser {
  onSuccess(data?: any): void;
  onError(error: AuthErrorType): void;
}
export interface IPayloadGetCurrentUser {
  submitData?: { email: string; password: string };
  onSuccess(data?: ILoggedUserInfo): any;
  onError(error: AuthErrorType): void;
}

export const registerUserThunk = createAsyncThunk<IRegisteredUser, IPayloadRegisterUser>(
  'auth/registerUserThunk',
  async (obj, thunkAPI) => {
    try {
      const { data } = await baseApi.post(authApiRoutes.signUp, obj.submitData);
      console.log(obj.submitData);

      obj.onSuccess(data.data);

      return data.data;
    } catch (error) {
      obj.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const logInUserThunk = createAsyncThunk<ILoggedUserInfo, IPayloadLogInUser, { state: { auth: IAuthState } }>(
  'auth/logInUserThunk',
  async (obj, thunkAPI) => {
    try {
      const {
        data: { data },
      }: { data: { data: ILoggedUserInfo } } = await baseApi.post(authApiRoutes.signIn, obj.submitData);

      obj.onSuccess(data);

      token.unset();
      return data;
    } catch (error) {
      obj.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const logOutUserThunk = createAsyncThunk<any, IPayloadLogOutUser>(
  'auth/logOutUserThunk',
  async (payload, thunkAPI) => {
    try {
      const { data }: { data: any } = await baseApi.post(authApiRoutes.signOut);

      payload?.onSuccess(data);
    } catch (error) {
      payload?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk<IUser | any, IPayloadGetCurrentUser, { state: RootState }>(
  'auth/getCurrentUserThunk',
  async (obj, thunkAPI) => {
    const state = thunkAPI.getState();

    token.set(state.auth.accessToken);

    try {
      const { data } = await baseApi.get(authApiRoutes.getCurrentUser);

      obj?.onSuccess(data.data);

      return data.data;
    } catch (error) {
      obj?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
