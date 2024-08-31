import { UserEntity } from 'types/auth/auth.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { AsyncThunkConfig } from 'redux/reduxTypes.types';
import { ThunkArgs } from '../store.store';
import { ApiAxiosResponse } from '../app-redux.types';
import { ClientApi } from '../../api';

const USERS_API_BASENAME = '/users';
export const usersApiRoutes = {
  getAll: `${USERS_API_BASENAME}/getAll`,
  getById: (userId?: string) => `${USERS_API_BASENAME}/getById/${userId}`,
  createByAdmin: `${USERS_API_BASENAME}/createByAdmin`,
};

enum AuthThunkType {
  getAll = 'auth/getAllUsersThunk',
  getById = 'users/getUserById',
}

export interface IGetAllUsersRes extends ApiAxiosResponse<UserEntity[]> {}

export const getAllUsersThunk = createAsyncThunk<UserEntity[], ThunkArgs, AsyncThunkConfig>(
  AuthThunkType.getAll,
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
