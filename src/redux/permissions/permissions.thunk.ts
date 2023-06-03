import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import {
  IPermission,
  IPermissionForReq,
  IPermissionReqData,
  IPermissionResData,
  IPermissionsResData,
} from './permissions.types';
import { ThunkPayload } from '../store.store';
import { AxiosResponse } from 'axios';
import baseApi from 'api/baseApi';
import { axiosErrorCheck } from 'utils';
import APP_CONFIGS from '../APP_CONFIGS';
import { testPermissions } from '../../data/permissions.data';

export const getAllPermissionsByUserIdThunk = createAsyncThunk<
  Partial<IPermission>[],
  ThunkPayload<{
    userId: string;
  }>
>('permissions/getAllPermissionsByUserIdThunk', async ({ submitData, onSuccess, onError }, thunkAPI) => {
  try {
    const response: AxiosResponse<IPermissionsResData> = await baseApi.get(
      APP_CONFIGS.endpoints.permissions.getAllByUserId(submitData?.userId as string)
    );

    onSuccess && onSuccess(response.data.data);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const getAllPermissionsByCompanyIdThunk = createAsyncThunk<
  Partial<IPermission>[],
  ThunkPayload<{
    companyId: string;
  }>
>('permissions/getAllPermissionsByCompanyIdThunk', async ({ submitData, onSuccess, onError }, thunkAPI) => {
  try {
    const response: AxiosResponse<IPermissionsResData> = await baseApi.get(
      APP_CONFIGS.endpoints.permissions.getAllByCompanyId(submitData?.companyId as string)
    );

    onSuccess && onSuccess(response.data.data);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
export const getCurrentPermissionThunk = createAsyncThunk<
  Partial<{ permissionToken: string } & IPermission>,
  ThunkPayload<{
    id: string;
  }>
>('permissions/getCurrentPermissionThunk', async ({ submitData, onSuccess, onError }, thunkAPI) => {
  try {
    //    const response: AxiosResponse<IPermissionResData> = await
    // baseApi.get(
    //   APP_CONFIGS.endpoints.permissions.getCurrentPermission(submitData?.id || '')
    // );
    // return response.data.data;

    const res = testPermissions.find(pr => pr._id === submitData?.id);

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
  async ({ submitData, onSuccess, onError }, thunkAPI) => {
    try {
      // const response: AxiosResponse<IPermissionResData> =
      baseApi.get(APP_CONFIGS.endpoints.permissions.getCurrentPermission(submitData?.id || ''));
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
  async ({ submitData, onSuccess, onError }, thunkAPI) => {
    try {
      const response: AxiosResponse<IPermissionResData> = await baseApi.post(
        APP_CONFIGS.endpoints.permissions.create(),
        submitData
      );

      onSuccess && onSuccess(response.data.data);

      return response.data.data;
    } catch (error) {
      onError && onError(error);
      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const editPermissionThunk = createAsyncThunk<Partial<IPermission>, ThunkPayload<IPermissionReqData>>(
  'permissions/editPermissionThunk',
  async ({ submitData, onSuccess, onError }, thunkAPI) => {
    try {
      const response: AxiosResponse<IPermissionResData> = await baseApi.post(
        APP_CONFIGS.endpoints.permissions.edit(submitData?.id as string),
        submitData?.data
      );

      onSuccess && onSuccess(response.data.data);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

// type PayloadCreatorOptions<Res extends { data: any } = any, ThunkAPI = any> = {
//   resCreator: () => AxiosResponse<Res>;
//   controls: {
//     onSuccess?: (data: Res) => void;
//     onError: (error: AxiosError | unknown) => void;
//   };
//   thunkAPI: ThunkAPI;
// };
// const PayloadCreator = <Res extends { data: any } = any>({ resCreator, controls, thunkAPI }: PayloadCreatorOptions) => {
//   const { onSuccess, onError } = controls || {};
//   try {
//     const response: AxiosResponse<Res> = resCreator();
//
//     onSuccess && onSuccess(response.data.data);
//
//     return response.data.data;
//   } catch (error) {
//     onError && onError(error);
//
//     return thunkAPI.rejectWithValue(axiosErrorCheck(error));
//   }
// };
export const deletePermissionByIdThunk = createAsyncThunk<
  Partial<IPermission>,
  ThunkPayload<Partial<IPermissionReqData>>
>('permissions/deletePermissionByIdThunk', async ({ submitData, onSuccess, onError }, thunkAPI) => {
  try {
    const response: AxiosResponse<IPermissionResData> = await baseApi.post(
      APP_CONFIGS.endpoints.permissions.edit(submitData?.id as string),
      submitData?.data
    );

    onSuccess && onSuccess(response.data.data);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
