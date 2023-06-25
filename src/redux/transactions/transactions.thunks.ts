import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { isAxiosError } from 'axios';
import { ITransaction, ITransactionReqData } from './transactions.types';
import TransactionsApi from '../../api/transactions.api';
import { AppQueryParams, createApiCall } from '../../api';
import { createThunkPayloadCreator } from '../../api/createApiCall.api';

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
  { refresh?: boolean; data?: ITransaction[] },
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    ITransaction[]
  >
>('transactions/getAllTransactionsThunk', async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const response = await TransactionsApi.getAll(data?.query);

    onSuccess && onSuccess(response.data.data);

    return { data: response.data.data, refresh: data?.refresh };
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
>('transactions/createTransactionThunk', async (payload, thunkApi) => {
  try {
    const res = await createApiCall(payload, TransactionsApi.create, TransactionsApi);
    console.log(res);
    return res?.data.data;
  } catch (error) {
    return thunkApi.rejectWithValue(isAxiosError(error));
  }
});
export const deleteTransactionThunk = createAsyncThunk(
  'transactions/deleteTransactionThunk',
  createThunkPayloadCreator(TransactionsApi.deleteById, TransactionsApi)
);
// export const deleteTransactionThunk = createAsyncThunk(
//   'transactions/deleteTransactionThunk',
//   async (payload, thunkAPI) => {
//     try {
//       const response = await baseApi.delete(`/transactions/${payload.submitData.id}`);
//       console.log(response.data);
//
//       payload?.onSuccess();
//
//       return response.data;
//     } catch (error) {
//       console.log(error);
//
//       payload?.onError();
//
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
