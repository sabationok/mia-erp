import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';

import baseApi from '../../api/baseApi';
import { ICount, ICreateCountThunkRes, IDeleteCountThunkRes, IGetAllCountsRes } from './counts.types';
import { ThunkPayload } from '../store.store';
import { isAxiosError } from 'axios';
// import { token } from '../../services/baseApi';
const COUNTS_API_BASENAME = '/directories/counts';
export const countsApiRoutes = {
  getAll: () => `${COUNTS_API_BASENAME}/getAll`,
  getById: (id?: string) => `${COUNTS_API_BASENAME}/getById/${id || ''}`,
  create: () => `${COUNTS_API_BASENAME}/create`,
  delete: (id?: string) => `${COUNTS_API_BASENAME}/delete/${id || ''}`,
  updateById: (id?: string) => `${COUNTS_API_BASENAME}/update/${id || ''}`,
};

export const getAllCountsThunk = createAsyncThunk<ICount[], ThunkPayload<any, IGetAllCountsRes>>(
  'counts/getAllCountsThunk',
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const response: IGetAllCountsRes = await baseApi.get(countsApiRoutes.getAll());

      response && onSuccess && onSuccess(response);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

export const createCountThunk = createAsyncThunk<ICount, ThunkPayload<Partial<ICount>, ICreateCountThunkRes>>(
  'counts/createCountThunk',
  async ({ onSuccess, onError, data }, thunkAPI) => {
    try {
      const response: ICreateCountThunkRes = await baseApi.post(countsApiRoutes.create(), data);
      console.log(response.data);

      response && onSuccess && onSuccess(response);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(isAxiosError(error));
    }
  }
);

export const deleteCountThunk = createAsyncThunk<
  {
    _id: string;
  },
  ThunkPayload<{ _id: string }, IDeleteCountThunkRes>
>('counts/deleteCountThunk', async ({ onSuccess, onError, data }, thunkAPI) => {
  try {
    const response: IDeleteCountThunkRes = await baseApi.delete(countsApiRoutes.delete());

    response && onSuccess && onSuccess(response);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(isAxiosError(error));
  }
});

// export const editCountThunk = createAsyncThunk('counts/editCountThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.patch(`/directories/counts/${payload.submitData.id}`, payload.submitData.updateData);
//
//     payload?.onSuccess(response);
//
//     return response.data;
//   } catch (error) {
//     console.log(error);
//
//     payload?.onError(error);
//
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
