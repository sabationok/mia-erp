import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ICustomRole } from 'redux/customRoles/customRoles.types';
// import { any } from 'data/counts.types';
import { StateErrorType } from 'redux/reduxTypes.types';
import { axiosErrorCheck } from 'utils';

import baseApi from '../../api/baseApi';
import { ThunkPayload } from '../store.store';
import { AppResponse } from '../global.types';
// import { token } from '../../services/baseApi';
const CUSTOM_ROLES_API_BASENAME = '/directories/customRoles';
export const rolesApiRoutes = {
  getAll: () => `${CUSTOM_ROLES_API_BASENAME}/getAll`,
  getById: () => `${CUSTOM_ROLES_API_BASENAME}/getById`,
  create: () => `${CUSTOM_ROLES_API_BASENAME}/create`,
  delete: () => `${CUSTOM_ROLES_API_BASENAME}/delete`,
  update: (id?: string) => `${CUSTOM_ROLES_API_BASENAME}/update/${id}`,
};

export interface IAllCustomRoles {
  data: ICustomRole[];
}

export interface IPayloadGetAllRoles {
  submitData?: null;
  onSuccess: (data?: ICustomRole[]) => void;

  onError(error?: StateErrorType): void;
}

export const getAllRolesThunk = createAsyncThunk<IAllCustomRoles, IPayloadGetAllRoles>(
  'customRoles/getAllCustomRolesThunk',
  async (payload, thunkAPI) => {
    try {
      const response: AxiosResponse<IAllCustomRoles> = await baseApi.get(rolesApiRoutes.getAll());

      payload?.onSuccess(response.data.data);

      return response.data;
    } catch (error) {
      payload?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const createCustomRoleThunk = createAsyncThunk<ICustomRole, ThunkPayload<Partial<ICustomRole>, ICustomRole>>(
  'customRoles/createCustomRoleThunk',
  async ({ onSuccess, onError, data }, thunkAPI) => {
    try {
      const response: AppResponse<ICustomRole> = await baseApi.post(rolesApiRoutes.create(), data);

      onSuccess && onSuccess(response.data.data);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
