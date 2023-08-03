import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPermission, IPermissionForReq, IPermissionReqData } from './permissions.types';
import { ThunkPayload } from '../store.store';
import { axiosErrorCheck } from 'utils';
import { CompaniesApi, PermissionsApi } from '../../api';
import { ICompanyForReq, ICompanyReqData } from '../companies/companies.types';

export const getAllPermissionsByUserIdThunk = createAsyncThunk<
  IPermission[],
  ThunkPayload<{
    userId: string;
  }>
>('permissions/getAllPermissionsByUserIdThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
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
export const getCurrentPermissionThunk = createAsyncThunk<
  Partial<{ permission_token: string } & IPermission>,
  ThunkPayload<
    {
      id: string;
    },
    { permission_token: string } & IPermission
  >
>('permissions/getCurrentPermissionThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await PermissionsApi.getCurrent();
    if (response) {
      onSuccess && onSuccess(response.data.data);
    }

    return response.data.data;

    // const response = await PermissionsApi.getCurrent(data?.id || '');
    // const res = testPermissions.find(pr => pr._id === data?.id);
    //
    // const mockRes = { ...res, permissionToken: nanoid(8) };
    //
    // if (mockRes) {
    //   onSuccess && onSuccess({ ...mockRes, permissionToken: 'permissionToken', _id: mockRes._id as string });
    // }
    //
    // return mockRes;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const logInPermissionThunk = createAsyncThunk<IPermission, ThunkPayload<{ _id: string }, IPermission>>(
  'permissions/logInPermissionThunk',
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
>('permissions/logOutPermissionThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
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
  'permissions/createPermissionThunk',
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
  'permissions/inviteUserThunk',
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
  'permissions/createCompanyWithPermissionThunk',
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await CompaniesApi.create(data as ICompanyForReq);

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
export const updateCompanyWithPermissionThunk = createAsyncThunk<IPermission, ThunkPayload<Required<ICompanyReqData>>>(
  'permissions/updateCompanyWithPermissionThunk',
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      const response = await CompaniesApi.updateById(data as Required<ICompanyReqData>);

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
>('permissions/deleteCompanyWithPermissionThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
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
  'permissions/updatePermissionThunk',
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
>('permissions/deletePermissionByIdThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
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
