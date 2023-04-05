import baseApi from 'api/baseApi';
import { token } from 'api/baseApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { axiosErrorCheck } from 'utils';
import { IAuthState, ICompany, IPermission, IUser } from './auth.slice';
import { AxiosResponse } from 'axios';

const AUTH_API_BASENAME = '/auth';
export const authApiRoutes = {
  getAll: `${AUTH_API_BASENAME}/getAll`,
  getById: `${AUTH_API_BASENAME}/getById`,
  signUp: `${AUTH_API_BASENAME}/signUp`,
  signIn: `${AUTH_API_BASENAME}/signIn`,
  signOut: `${AUTH_API_BASENAME}/signOut`,
  getCurrentUser: `${AUTH_API_BASENAME}/getCurrentUser`,
  getCurrentUserInfo: `${AUTH_API_BASENAME}/getCurrentUserInfo`,
  getCurrentPermission: () => `${AUTH_API_BASENAME}/getCurrentPermission`,
};

export interface ILoggedUserInfo {
  accessToken: string;
  email: string;
}
export interface IRegisteredUser {
  email: string;
}
export interface ILoginUserData {
  email: string;
  password: string;
}
export interface IRegistrationData extends ILoginUserData {
  name: string;
  secondName?: string;
}
export type ICurrentUser = Partial<IUser> & Pick<IAuthState, 'accessToken'>;
export type ICurrentCompany = ICompany;

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
  onSuccess(data?: ICurrentUser): any;
  onError(error: AuthErrorType): void;
}
export interface IPayloadGetCurrentPermission {
  submitData?: { permissionId: string };
  onSuccess(data?: IPermission): any;
  onError(error: AuthErrorType): void;
}

export const registerUserThunk = createAsyncThunk<IRegisteredUser, IPayloadRegisterUser>(
  'auth/registerUserThunk',
  async (obj, thunkAPI) => {
    try {
      const response: AxiosResponse<IRegisteredUser> = await baseApi.post(authApiRoutes.signUp, obj.submitData);

      obj.onSuccess(response.data);

      return response.data;
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
      const response: AxiosResponse<ILoggedUserInfo> = await baseApi.post(authApiRoutes.signIn, obj.submitData);

      obj.onSuccess(response.data);

      token.set(response.data.accessToken);
      return response.data;
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
      const response: AxiosResponse<any> = await baseApi.post(authApiRoutes.signOut);

      payload?.onSuccess(response);

      token.unset();
    } catch (error) {
      payload?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const getCurrentUserThunk = createAsyncThunk<ICurrentUser, IPayloadGetCurrentUser>(
  'auth/getCurrentUserThunk',
  async (obj, thunkAPI) => {
    try {
      const response: AxiosResponse<ICurrentUser> = await baseApi.get(authApiRoutes.getCurrentUser);

      obj?.onSuccess(response.data);

      return response.data;
    } catch (error) {
      obj?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const getCurrentPermissionThunk = createAsyncThunk<IPermission, IPayloadGetCurrentPermission>(
  'auth/getCurrentPermissionThunk',
  async (obj, thunkAPI) => {
    try {
      const response: AxiosResponse<IPermission> = await baseApi.get(authApiRoutes.getCurrentPermission());

      obj?.onSuccess(response.data);

      return response.data;
    } catch (error) {
      obj?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
