import { IRegisteredUser, IRegisteredUserInfoRes, IRegistrationData, IUser } from 'types/auth.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { AsyncThunkConfig } from 'redux/reduxTypes.types';
import { ThunkPayload } from '../store.store';
import { AppResponse } from '../global.types';
import { ClientApi } from '../../api';

const USERS_API_BASENAME = '/users';
export const usersApiRoutes = {
  getAll: `${USERS_API_BASENAME}/getAll`,
  getById: (userId?: string) => `${USERS_API_BASENAME}/getById/${userId}`,
  createByAdmin: `${USERS_API_BASENAME}/createByAdmin`,
};

export interface IGetAllUsersRes extends AppResponse<IUser[]> {}

export interface IGetUserByIdRes extends AppResponse<IUser> {}

export const getAllUsersThunk = createAsyncThunk<IUser[], ThunkPayload, AsyncThunkConfig>(
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

export const getUserById = createAsyncThunk<IUser, ThunkPayload<{ userId: string }>, AsyncThunkConfig>(
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

export const createUserByAdminThunk = createAsyncThunk<
  IRegisteredUser,
  ThunkPayload<IRegistrationData>,
  AsyncThunkConfig
>('auth/createUserByAdminThunk', async ({ onSuccess, onError, data }, thunkAPI) => {
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
});
