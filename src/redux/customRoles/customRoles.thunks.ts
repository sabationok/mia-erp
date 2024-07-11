import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ICustomRole, ModuleWithActions } from 'redux/customRoles/customRoles.types';
import { StateErrorType } from 'redux/reduxTypes.types';
import { axiosErrorCheck } from 'utils';
import { ThunkArgs } from '../store.store';
import { ApiResponse } from '../app-redux.types';
import CustomRolesApi from '../../api/customRoles.api';
import { ClientApi } from '../../api';
// import { token } from '../../services/baseApi';
const CUSTOM_ROLES_API_BASENAME = '/directories/customRoles';
export const rolesApiRoutes = {
  getAll: () => `${CUSTOM_ROLES_API_BASENAME}/getAll`,
  getById: () => `${CUSTOM_ROLES_API_BASENAME}/getById`,
  create: () => `${CUSTOM_ROLES_API_BASENAME}/create`,
  delete: () => `${CUSTOM_ROLES_API_BASENAME}/delete`,
  update: (id?: string) => `${CUSTOM_ROLES_API_BASENAME}/update/${id}`,
};

enum RolesThunkTypeEnum {
  getAllRoles = 'roles/getAllRolesThunk',
  getAllActions = 'roles/getAllActionsThunk',
  create = 'roles/createRoleThunk',
}

export interface IAllCustomRoles {
  data: ICustomRole[];
}

export interface IPayloadGetAllRoles {
  submitData?: null;
  onSuccess: (data?: ICustomRole[]) => void;

  onError(error?: StateErrorType): void;
}
export const getAllActionsThunk = createAsyncThunk<
  { data: ModuleWithActions[] },
  ThunkArgs<undefined, ModuleWithActions[]>
>(RolesThunkTypeEnum.getAllActions, async (args, thunkAPI) => {
  args?.onLoading && args.onLoading(true);
  try {
    const r = await CustomRolesApi.getAllActions();

    args?.onSuccess && args.onSuccess(r.data.data);
    args?.onLoading && args.onLoading(false);

    return { data: r.data.data };
  } catch (error) {
    args?.onError && args.onError(error);
    args?.onLoading && args.onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const getAllRolesThunk = createAsyncThunk<IAllCustomRoles, IPayloadGetAllRoles>(
  RolesThunkTypeEnum.getAllRoles,
  async (payload, thunkAPI) => {
    try {
      const response: AxiosResponse<IAllCustomRoles> = await ClientApi.clientRef.get(rolesApiRoutes.getAll());

      payload?.onSuccess(response.data.data);

      return response.data;
    } catch (error) {
      payload?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const createCustomRoleThunk = createAsyncThunk<ICustomRole, ThunkArgs<Partial<ICustomRole>, ICustomRole>>(
  RolesThunkTypeEnum.create,
  async ({ onSuccess, onError, data }, thunkAPI) => {
    try {
      const response: ApiResponse<ICustomRole> = await ClientApi.clientRef.post(rolesApiRoutes.create(), data);

      onSuccess && onSuccess(response.data.data);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
