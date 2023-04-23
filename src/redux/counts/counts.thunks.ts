import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ICount } from 'redux/counts/counts.types';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { axiosErrorCheck } from 'utils';

import baseApi from '../../api/baseApi';
// import { token } from '../../services/baseApi';
const COUNTS_API_BASENAME = '/directories/counts';
export const countsApiRoutes = {
  getAll: `${COUNTS_API_BASENAME}/getAll`,
  getById: `${COUNTS_API_BASENAME}/getById`,
  create: `${COUNTS_API_BASENAME}/create`,
  delete: `${COUNTS_API_BASENAME}/delete`,
  update: `${COUNTS_API_BASENAME}/update`,
};

export interface IAllCounts {
  data: ICount[];
}

export interface IPayloadGetAllTr {
  submitData?: null;
  onSuccess: (data?: ICount[]) => void;

  onError(error?: AuthErrorType): void;
}

// export interface IPayloadLogInUser {
//   submitData: { email: string; password: string };
//   onSuccess(data?: any): void ;
//   onError(error: AuthErrorType): void;
// }
// export interface IPayloadLogOutUser {
//   onSuccess(data?: any): void;
//   onError(error: AuthErrorType): void;
// }
// export interface IPayloadGetCurrentUser {
//   submitData?: { email: string; password: string };
//   onSuccess(data?: ILoggedUserInfo): any;
//   onError(error: AuthErrorType): void;
// }

export const getAllCountsThunk = createAsyncThunk<IAllCounts, IPayloadGetAllTr>(
  'counts/getAllCountsThunk',
  async (payload, thunkAPI) => {
    try {
      const response: AxiosResponse<IAllCounts> = await baseApi.get(countsApiRoutes.getAll);

      payload?.onSuccess(response.data.data);

      return response.data;
    } catch (error) {
      payload?.onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  },
);

// export const addCountThunk = createAsyncThunk<>('counts/addCountThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.post(`/directories/counts/create`, payload.submitData);
//     console.log(response.data);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     // console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const deleteCountThunk = createAsyncThunk('counts/deleteCountThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.delete(`/directories/counts/${payload.submitData.id}`);
//     console.log(response.data);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const editCountThunk = createAsyncThunk('counts/editCountThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.patch(`/directories/counts/${payload.submitData.id}`, payload.submitData.updateData);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const getCountsByParentIdThunk = createAsyncThunk(
//   'counts/getCountsByParentIdThunk',
//   async (payload, thunkAPI) => {
//     try {
//       const response = await baseApi.get(`/directories/counts/getByOwnerId/${payload.submitData.id}`);
//       console.log(response.data);

//       payload?.onSuccess(response);

//       return response.data;
//     } catch (error) {
//       console.log(error);

//       payload?.onError(error);

//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
