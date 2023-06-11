import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { IPermission, IPermissionForReq, IPermissionReqData, IPermissionsResData } from './permissions.types';
import { ThunkPayload } from '../store.store';
import { AxiosResponse } from 'axios';
import baseApi from 'api/baseApi';
import { axiosErrorCheck } from 'utils';
import APP_CONFIGS from '../APP_CONFIGS';
import { testPermissions } from '../../data/permissions.data';
import { PermissionsApi } from '../../api';

export const getAllPermissionsByUserIdThunk = createAsyncThunk<
  Partial<IPermission>[],
  ThunkPayload<{
    userId: string;
  }>
>('permissions/getAllPermissionsByUserIdThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response: AxiosResponse<IPermissionsResData> = await baseApi.get(
      APP_CONFIGS.endpoints.permissions.getAllByUserId(data?.userId as string)
    );

    onSuccess && onSuccess(response.data.data);

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
  Partial<{ permissionToken: string } & IPermission>,
  ThunkPayload<{
    id: string;
  }>
>('permissions/getCurrentPermissionThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    //    const response: AxiosResponse<IPermissionResData> = await
    // baseApi.get(
    //   APP_CONFIGS.endpoints.permissions.getCurrentPermission(data?.id || '')
    // );
    // return response.data.data;
    // const response = await PermissionsApi.getCurrent(data?.id || '');
    const res = testPermissions.find(pr => pr._id === data?.id);

    const mockRes = { ...res, permissionToken: nanoid(8) };
    onSuccess && onSuccess(mockRes);

    return mockRes;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const logOutPermissionThunk = createAsyncThunk<{ result: true }, ThunkPayload<{ id: string }>>(
  'permissions/logOutPermissionThunk',
  async ({ data, onSuccess, onError }, thunkAPI) => {
    try {
      // const response: AxiosResponse<IPermissionResData> =

      // onSuccess && onSuccess(response.data.data);
      // return response.data.data;

      return { result: true };
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const createPermissionThunk = createAsyncThunk<Partial<IPermission>, ThunkPayload<IPermissionForReq>>(
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
  Partial<IPermission>,
  ThunkPayload<Partial<IPermissionReqData>>
>('permissions/deletePermissionByIdThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await PermissionsApi.deleteById(data?.id || '');

    if (response) {
      onSuccess && onSuccess(response.data.data);
    }
    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
