import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { isAxiosError } from 'axios';
import { ICreateTransactionRes, ITransaction, ITransactionReqData } from './transactions.types';
import TransactionsApi from '../../api/transactions.api';
import { FilterReturnDataType } from '../../components/Filter/AppFilter';

// export async function payloadCreator<R = any>(
//   getResponse: () => R,
//   { onSuccess, onError, onLoading }: Omit<ThunkPayload<any, any, any>, 'data' | 'submitData'>,
//   thunkAPI: any
// ): Promise<R> {
//   try {
//     const response: AxiosResponse<R> = await baseApi.get(transactionsApiEndpoints.getAll());
//
//     onSuccess && onSuccess(response.data.data);
//
//     return response.data.data;
//   } catch (error) {
//     onError && onError(error);
//
//     return thunkAPI.rejectWithValue(axiosErrorCheck(error));
//   } finally {
//     onLoading && onLoading(false);
//   }
// }

export const getAllTransactionsThunk = createAsyncThunk<
  ITransaction[],
  ThunkPayload<FilterReturnDataType, ITransaction[]>
>('transactions/getAllTransactionsThunk', async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const response = await TransactionsApi.getAll({ filter: data });

    onSuccess && onSuccess(response.data.data);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  } finally {
    onLoading && onLoading(false);
  }
});

export const createTransactionThunk = createAsyncThunk<
  ITransaction | undefined,
  ThunkPayload<ITransactionReqData, ITransaction>
>('transactions/createTransactionThunk', async ({ onSuccess, onError, onLoading, data }, thunkApi) => {
  onLoading && onLoading(true);
  try {
    const response: ICreateTransactionRes = await TransactionsApi.create(data || {});

    response && onSuccess && onSuccess(response.data.data);

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkApi.rejectWithValue(isAxiosError(error));
  } finally {
    onLoading && onLoading(false);
  }
});

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
