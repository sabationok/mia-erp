import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPermission, IPermissionForReq, IPermissionReqData } from './permissions.types';
import { ThunkPayload } from '../store.store';
import { axiosErrorCheck } from 'utils';
import { CompaniesApi, PermissionsApi } from '../../api';
import { ICompanyForReq } from '../companies/companies.types';
import { createUpdateCompanyThunk } from '../companies/companies.thunks';

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
  IPermission[],
  ThunkPayload<{
    userId: string;
  }>
>(PermissionsThunkType.getAllPermissionsByUserId, async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await PermissionsApi.getAllByUserId(data?.userId as string);
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const getAllPermissionsByCompanyIdThunk = createAsyncThunk<
  IPermission[],
  ThunkPayload<{
    companyId: string;
  }>
>('permissions/getAllPermissionsByCompanyIdThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await PermissionsApi.getAllByCompanyId(data?.companyId as string);
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const getCurrentPermissionThunk = createAsyncThunk<
  Partial<{ permission_token: string } & IPermission>,
  ThunkPayload<
    {
      id: string;
    },
    { permission_token: string } & IPermission
  >
>(PermissionsThunkType.getCurrent, async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await PermissionsApi.getCurrent();
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    return response.data.data;
  } catch (error) {
    onError && onError(error);
    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const logInPermissionThunk = createAsyncThunk<IPermission, ThunkPayload<{ _id: string }, IPermission>>(
  PermissionsThunkType.login,
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await PermissionsApi.logIn(data?._id as string);
      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const logOutPermissionThunk = createAsyncThunk<
  { _id?: string; result: boolean },
  ThunkPayload<
    any,
    {
      _id?: string;
      result: boolean;
    }
  >
>(PermissionsThunkType.logOut, async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await PermissionsApi.logOut();
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const createPermissionThunk = createAsyncThunk<IPermission, ThunkPayload<IPermissionForReq, IPermission>>(
  PermissionsThunkType.create,
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await PermissionsApi.create(data as IPermissionForReq);
      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      return response.data.data;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const inviteUserThunk = createAsyncThunk<IPermission, ThunkPayload<IPermissionForReq, IPermission>>(
  PermissionsThunkType.inviteUser,
  async ({ data, onSuccess, onLoading, onError }, thunkAPI) => {
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
export const createCompanyWithPermissionThunk = createAsyncThunk<IPermission, ThunkPayload<ICompanyForReq>>(
  PermissionsThunkType.createCompanyWithPermission,
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await CompaniesApi.create({ data: data as ICompanyForReq });

      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      return response.data.data;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const deleteCompanyWithPermissionThunk = createAsyncThunk<
  Partial<{ _id?: string; result: boolean }>,
  ThunkPayload<{ _id: string }>
>(PermissionsThunkType.deleteCompanyWithPermission, async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await CompaniesApi.deleteById(data?._id as string);

    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    return response.data.data;
  } catch (error) {
    onError && onError(error);
    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const updatePermissionThunk = createAsyncThunk<Partial<IPermission>, ThunkPayload<IPermissionReqData>>(
  PermissionsThunkType.update,
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await PermissionsApi.updateById(data || { id: '', data: {} });
      if (response) {
        onSuccess && onSuccess(response.data.data);
      }
      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const deletePermissionByIdThunk = createAsyncThunk<
  { _id?: string; result: boolean },
  ThunkPayload<Partial<IPermissionReqData>>
>(PermissionsThunkType.deletePermissionById, async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await PermissionsApi.deleteById(data?.id as string);

    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const updateCurrentCompanyThunk = createUpdateCompanyThunk(PermissionsThunkType.updateCurrentCompanyThunk);

// export const getAllPermissionsByCompanyIdThunk = createAsyncThunk<
//   Partial<IPermission>[],
//   ThunkPayload<{
//     companyId: string;
//   }>
// >('permissions/getAllPermissionsByCompanyIdThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
//   try {
//     const response = await PermissionsApi.getAllByCompanyId(data?.companyId as string);
//
//     onSuccess && onSuccess(response.data.data);
//
//     return response.data.data;
//   } catch (error) {
//     onError && onError(error);
//
//     return thunkAPI.rejectWithValue(axiosErrorCheck(error));
//   }
// });
