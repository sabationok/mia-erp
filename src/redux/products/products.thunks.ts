import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { isAxiosError } from 'axios';
import { IProduct, IProductReqData } from './products.types';
import { AppQueryParams, createApiCall } from '../../api';
import { createThunkPayloadCreator } from '../../api/createApiCall.api';
import ProductsApi from '../../api/products.api';
import { OnlyUUID } from '../global.types';

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

export const getAllProductsThunk = createAsyncThunk<
  { refresh?: boolean; data?: IProduct[] },
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    IProduct[]
  >
>('products/getAllProductsThunk', async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const response = await ProductsApi.getAll(data?.query);

    onSuccess && onSuccess(response.data.data);

    return { data: response.data.data, refresh: data?.refresh };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  } finally {
    onLoading && onLoading(false);
  }
});

export const getProductFullInfoThunk = createAsyncThunk<IProduct, ThunkPayload<OnlyUUID, IProduct>>(
  'products/getProductFullInfoThunk',
  async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
    onLoading && onLoading(true);

    try {
      const response = await ProductsApi.getFullInfoById(data?._id);

      onSuccess && onSuccess(response.data.data);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    } finally {
      onLoading && onLoading(false);
    }
  }
);

export const createProductThunk = createAsyncThunk<IProduct | undefined, ThunkPayload<IProductReqData, IProduct>>(
  'products/createProductThunk',
  async (payload, thunkApi) => {
    try {
      const res = await createApiCall(payload, ProductsApi.create, ProductsApi);
      console.log(res);
      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);

export const updateProductThunk = createAsyncThunk<IProduct | undefined, ThunkPayload<IProductReqData, IProduct>>(
  'products/updateProductThunk',
  async (payload, thunkApi) => {
    try {
      const res = await createApiCall({ ...payload, throwError: true }, ProductsApi.updateById, ProductsApi);

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(isAxiosError(error));
    }
  }
);
export const deleteProductThunk = createAsyncThunk(
  'products/deleteProductThunk',
  createThunkPayloadCreator(ProductsApi.deleteById, ProductsApi)
);

// ??? VARIATIONS

// export const deleteProductThunk = createAsyncThunk(
//   'products/deleteProductThunk',
//   async (payload, thunkAPI) => {
//     try {
//       const response = await baseApi.delete(`/products/${payload.submitData.id}`);
//       console.log(response.data);
//
//       payload?.onSuccess();
//
//       return response.data;
//     } catch (e) {
//       console.log(error);
//
//       payload?.onError();
//
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const editProductThunk = createAsyncThunk('products/editProductThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.patch(`/products/${payload.submitData.id}`, payload.submitData.updateData);

//     payload?.onSuccess(response.data.data);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError();

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
