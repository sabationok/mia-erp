import baseApi from 'api/baseApi';
import { IUser } from 'redux/auth/auth.slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { IPayloadRegisterUser } from 'redux/auth/auth.thunks';
import { AsyncThunkConfig, AuthErrorType } from 'redux/reduxTypes.types';

const USERS_API_BASENAME = '/users';
export const usersApiRoutes = {
  getAll: `${USERS_API_BASENAME}/getAll`,
  getById: `${USERS_API_BASENAME}/getById`,
  createByAdmin: `${USERS_API_BASENAME}/createByAdmin`,
};
export interface IPayloadGetAllUsers {
  submitData?: any;
  onSuccess(data?: IUser[]): any;
  onError: (error: AuthErrorType) => void;
}
export interface IPayloadGetuserById {
  submitData?: string | any;
  onSuccess(data?: IUser): any;
  onError: (error: AuthErrorType) => void;
}

export const getAllUsersThunk = createAsyncThunk<IUser[], IPayloadGetAllUsers, AsyncThunkConfig>(
  'auth/getAllUsersThunk',
  async (payload, thunkAPI) => {
    try {
      const {
        data: { data },
      }: { data: { data: IUser[] } } = await baseApi.get(usersApiRoutes.getAll);

      payload.onSuccess(data);
      return data;
    } catch (error) {
      payload.onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const getUserById = createAsyncThunk<IUser, IPayloadGetuserById, AsyncThunkConfig>(
  'auth/getUserById',
  async (payload, thunkAPI) => {
    try {
      const { data }: { data: { data: IUser } } = await baseApi.get(usersApiRoutes.getById, payload?.submitData);

      payload.onSuccess(data.data);

      return data.data;
    } catch (error) {
      payload.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const createUserByAdminThunk = createAsyncThunk<IUser, IPayloadRegisterUser, AsyncThunkConfig>(
  'auth/createUserByAdminThunk',
  async (payload, thunkAPI) => {
    try {
      const { data } = await baseApi.post(usersApiRoutes.createByAdmin, payload.submitData);

      payload.onSuccess(data.data);

      return data.data;
    } catch (error) {
      payload.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
