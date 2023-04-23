import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import baseApi from '../../api/baseApi';
import { ThunkPayload } from '../store.store';
import { AxiosResponse } from 'axios';

export const TRANSACTIONS_API_BASENAME = '/transactions';
export const transactionsApiEndpoints = {
  getAll: (): string => `${TRANSACTIONS_API_BASENAME}/getAll`,
  create: (): string => `${TRANSACTIONS_API_BASENAME}/create`,
  deleteById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/delete/${id}`,
  updateById: (id: string): string => `${TRANSACTIONS_API_BASENAME}/update/${id}`,
};

export const getAllTransactionsThunk = createAsyncThunk<any[], ThunkPayload>(
  'transactions/getAllTransactionsThunk',
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const response: AxiosResponse<any> = await baseApi.get(transactionsApiEndpoints.getAll());

      onSuccess && onSuccess(response);

      return response.data;
    } catch (error) {
      console.log(error);

      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  },
);

// export const addTransactionThunk = createAsyncThunk('transactions/addTransactionThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.post(`/transactions/create`, payload.submitData);
//     console?.log(response.data);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const deleteTransactionThunk = createAsyncThunk(
//   'transactions/deleteTransactionThunk',
//   async (payload, thunkAPI) => {
//     try {
//       const response = await baseApi.delete(`/transactions/${payload.submitData.id}`);
//       console.log(response.data);

//       payload?.onSuccess();

//       return response.data;
//     } catch (error) {
//       console.log(error);

//       payload?.onError();

//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const editTransactionThunk = createAsyncThunk('transactions/editTransactionThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.patch(`/transactions/${payload.submitData.id}`, payload.submitData.updateData);

//     payload?.onSuccess(response.data.data);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError();

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
