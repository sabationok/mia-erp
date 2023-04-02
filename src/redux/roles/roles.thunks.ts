import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
// import { any } from 'data/counts.types';
import { StateErrorType } from 'redux/reduxTypes.types';
import { axiosErrorCheck } from 'utils';

import baseApi from '../../api/baseApi';
// import { token } from '../../services/baseApi';
const ROLES_API_BASENAME = '/directories/roles';
export const rolesApiRoutes = {
  getAll: `${ROLES_API_BASENAME}/getAll`,
  getById: `${ROLES_API_BASENAME}/getById`,
  create: `${ROLES_API_BASENAME}/create`,
  delete: `${ROLES_API_BASENAME}/delete`,
  update: `${ROLES_API_BASENAME}/update`,
};

export interface IAllRoles {
  data: any[];
}
export interface IPayloadGetAllRoles {
  submitData?: null;
  onSuccess: (data?: any[]) => void;
  onError(error?: StateErrorType): void;
}
export const getAllRolesThunk = createAsyncThunk<IAllRoles, IPayloadGetAllRoles>(
  'roles/getAllRolesThunk',
  async (payload, thunkAPI) => {
    try {
      const response: AxiosResponse<IAllRoles> = await baseApi.get(rolesApiRoutes.getAll);

      payload?.onSuccess(response.data.data);

      return response.data;
    } catch (error) {
      payload?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
