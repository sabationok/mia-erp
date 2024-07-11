import { IRegisteredUser, IRegisteredUserInfoRes, IRegistrationData, UserEntity } from 'types/auth.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { AsyncThunkConfig } from 'redux/reduxTypes.types';
import { ThunkArgs } from '../store.store';
import { ApiResponse } from '../app-redux.types';
import { ClientApi } from '../../api';

const USERS_API_BASENAME = '/users';
export const usersApiRoutes = {
  getAll: `${USERS_API_BASENAME}/getAll`,
  getById: (userId?: string) => `${USERS_API_BASENAME}/getById/${userId}`,
  createByAdmin: `${USERS_API_BASENAME}/createByAdmin`,
};

export interface IGetAllUsersRes extends ApiResponse<UserEntity[]> {}

export interface IGetUserByIdRes extends ApiResponse<UserEntity> {}

export const getAllUsersThunk = createAsyncThunk<UserEntity[], ThunkArgs, AsyncThunkConfig>(
  'auth/getAllUsersThunk',
  async ({ onError, onSuccess }, thunkAPI) => {
    try {
      const {
        data: { data },
      }: IGetAllUsersRes = await ClientApi.clientRef.get(usersApiRoutes.getAll);

      onSuccess && onSuccess(data);
      return data;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const getUserById = createAsyncThunk<UserEntity, ThunkArgs<{ userId: string }>, AsyncThunkConfig>(
  'auth/getUserById',
  async ({ onSuccess, onError, data }, thunkAPI) => {
    try {
      const res: IGetUserByIdRes = await ClientApi.clientRef.get(usersApiRoutes.getById(data?.userId));

      onSuccess && onSuccess(res.data.data);

      return res.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const createUserByAdminThunk = createAsyncThunk<IRegisteredUser, ThunkArgs<IRegistrationData>, AsyncThunkConfig>(
  'auth/createUserByAdminThunk',
  async ({ onSuccess, onError, data }, thunkAPI) => {
    try {
      const {
        data: { data },
      }: IRegisteredUserInfoRes = await ClientApi.clientRef.post(usersApiRoutes.createByAdmin, {});

      onSuccess && onSuccess(data);

      return data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
