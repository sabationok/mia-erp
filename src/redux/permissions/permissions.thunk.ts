import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  IPermissionForReq,
  IPermissionReqData,
  PermissionEntity,
  PermissionRecipientEnum,
} from '../../types/permissions.types';
import { ThunkPayload } from '../store.store';
import { axiosErrorCheck } from 'utils';
import { CompaniesApi, PermissionsApi } from '../../api';
import { ICompanyForReq } from '../../types/companies.types';
import { buildUpdateCompanyThunk } from '../companies/companies.thunks';
import { UserEntity } from '../../types/auth.types';
import { CompanyQueryType } from '../app-redux.types';

enum PermissionsThunkType {
  getAllPermissionsByUserId = 'permissions/getAllPermissionsByUserIdThunk',
  login = 'permissions/logInPermissionThunk',
  logOut = 'permissions/logOutPermissionThunk',
  getCurrent = 'permissions/getCurrentPermissionThunk',
  create = 'permissions/createPermissionThunk',
  update = 'permissions/updatePermissionThunk',
  deletePermissionById = 'permissions/deletePermissionByIdThunk',
  inviteUser = 'permissions/inviteUserThunk',
  createCompanyWithPermission = 'permissions/createCompanyWithPermissionThunk',
  deleteCompanyWithPermission = 'permissions/deleteCompanyWithPermissionThunk',
  updateCurrentCompanyThunk = 'permissions/updateCurrentCompanyThunk',
  setCurrentCompanyConfigs = 'permissions/setCurrentCompanyConfigsThunk',
  getCurrentCompanyConfigs = 'permissions/getCurrentCompanyConfigsThunk',
}

export const getAllPermissionsByUserIdThunk = createAsyncThunk<
  PermissionEntity[],
  ThunkPayload<{
    userId: string;
    query?: { type?: CompanyQueryType };
  }>
>(PermissionsThunkType.getAllPermissionsByUserId, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const response = await PermissionsApi.getAllByUserId(data);
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }

    onLoading && onLoading(false);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const getAllPermissionsByCompanyIdThunk = createAsyncThunk<
  PermissionEntity[],
  ThunkPayload<{ _id: string; params?: { recipient?: PermissionRecipientEnum } }>
>('permissions/getAllPermissionsByCompanyIdThunk', async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const response = await PermissionsApi.getAllByCompanyId(data);
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }

    onLoading && onLoading(false);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const getCurrentPermissionThunk = createAsyncThunk<
  Partial<{ permission_token: string } & PermissionEntity>,
  ThunkPayload<
    {
      id: string;
    },
    { permission_token: string } & PermissionEntity
  >
>(PermissionsThunkType.getCurrent, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const response = await PermissionsApi.getCurrent();
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    onLoading && onLoading(false);

    return response.data.data;
  } catch (error) {
    onError && onError(error);
    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const logInPermissionThunk = createAsyncThunk<PermissionEntity, ThunkPayload<{ _id: string }, PermissionEntity>>(
  PermissionsThunkType.login,
  async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
    onLoading && onLoading(true);
    try {
      const response = await PermissionsApi.logIn(data?._id as string);
      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      onLoading && onLoading(false);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      onLoading && onLoading(false);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const logOutPermissionThunk = createAsyncThunk<
  { _id?: string; result: boolean; user: UserEntity },
  ThunkPayload<
    any,
    {
      _id?: string;
      result: boolean;
      user: UserEntity;
    }
  >
>(PermissionsThunkType.logOut, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const response = await PermissionsApi.logOut();
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }

    onLoading && onLoading(false);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const createPermissionThunk = createAsyncThunk<
  PermissionEntity,
  ThunkPayload<IPermissionForReq, PermissionEntity>
>(PermissionsThunkType.create, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const response = await PermissionsApi.create(data as IPermissionForReq);
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    onLoading && onLoading(false);

    return response.data.data;
  } catch (error) {
    onError && onError(error);
    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const inviteUserThunk = createAsyncThunk<PermissionEntity, ThunkPayload<IPermissionForReq, PermissionEntity>>(
  PermissionsThunkType.inviteUser,
  async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
    onLoading && onLoading(false);
    if (!data) return thunkAPI.rejectWithValue('invite data not passed');
    onLoading && onLoading(true);

    try {
      const response = await PermissionsApi.inviteUser(data as IPermissionForReq);
      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      onLoading && onLoading(false);

      return response.data.data;
    } catch (error) {
      onError && onError(error);
      onLoading && onLoading(false);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const createCompanyWithPermissionThunk = createAsyncThunk<PermissionEntity, ThunkPayload<ICompanyForReq>>(
  PermissionsThunkType.createCompanyWithPermission,
  async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
    onLoading && onLoading(true);
    try {
      const response = await CompaniesApi.create({ data: data as ICompanyForReq });

      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      onLoading && onLoading(false);

      return response.data.data;
    } catch (error) {
      onError && onError(error);
      onLoading && onLoading(false);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const deleteCompanyWithPermissionThunk = createAsyncThunk<
  Partial<{ _id?: string; result: boolean }>,
  ThunkPayload<{ _id: string }>
>(PermissionsThunkType.deleteCompanyWithPermission, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const response = await CompaniesApi.deleteById(data?._id as string);

    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    onLoading && onLoading(false);

    return response.data.data;
  } catch (error) {
    onError && onError(error);
    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const updatePermissionThunk = createAsyncThunk<Partial<PermissionEntity>, ThunkPayload<IPermissionReqData>>(
  PermissionsThunkType.update,
  async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
    onLoading && onLoading(true);
    try {
      const response = await PermissionsApi.updateById(data || { id: '', data: {} });
      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      onLoading && onLoading(false);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      onLoading && onLoading(false);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const deletePermissionByIdThunk = createAsyncThunk<
  { _id?: string; result: boolean },
  ThunkPayload<Partial<IPermissionReqData>>
>(PermissionsThunkType.deletePermissionById, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);
  try {
    const response = await PermissionsApi.deleteById(data?.id as string);

    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    onLoading && onLoading(false);

    return response.data.data;
  } catch (error) {
    onError && onError(error);
    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const updateCurrentCompanyThunk = buildUpdateCompanyThunk(PermissionsThunkType.updateCurrentCompanyThunk);
