import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { isAxiosError } from 'axios';
import { IProduct, IProductReqData } from './products.types';
import { AppQueryParams, PriceManagementApi, WarehousesApi } from '../../api';
import { createThunkPayloadCreator } from '../../api/createApiCall.api';
import ProductsApi from '../../api/products.api';
import { OnlyUUID } from '../global.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { IProductInventory } from '../warehouses/warehouses.types';
import { IVariation } from './variations.types';

enum ProductsThunkType {
  getAllProductsThunk = 'products/getAllProductsThunk',
  getProductFullInfoThunk = 'products/getProductFullInfoThunk',
  createProductThunk = 'products/createProductThunk',
  updateProductThunk = 'products/updateProductThunk',
  deleteProductThunk = 'products/deleteProductThunk',
  getAllPrices = 'products/getAllPrices',
  getAllInventories = 'products/getAllInventories',
  getAllVariations = 'products/getAllVariations',
}
export interface ProductThunkPayloadByType {
  [ProductsThunkType.getAllProductsThunk]: {};
  [ProductsThunkType.getProductFullInfoThunk]: {};
  [ProductsThunkType.createProductThunk]: {};
  [ProductsThunkType.updateProductThunk]: {};
  [ProductsThunkType.deleteProductThunk]: {};
  [ProductsThunkType.getAllVariations]: ThunkPayload<
    { refreshCurrent?: boolean; params?: Pick<AppQueryParams, 'list' | 'product' | 'variation'> },
    IVariation[]
  >;
  [ProductsThunkType.getAllPrices]: ThunkPayload<
    { refreshCurrent?: boolean; params?: Pick<AppQueryParams, 'list' | 'product' | 'variation'> },
    IPriceListItem[]
  >;
  [ProductsThunkType.getAllInventories]: ThunkPayload<
    { refreshCurrent?: boolean; params?: Pick<AppQueryParams, 'price' | 'product' | 'variation' | 'warehouse'> },
    IProductInventory[]
  >;
}
export interface ProductThunkReturnDataByType {
  [ProductsThunkType.getAllProductsThunk]: {};
  [ProductsThunkType.getProductFullInfoThunk]: {};
  [ProductsThunkType.createProductThunk]: {};
  [ProductsThunkType.updateProductThunk]: {};
  [ProductsThunkType.deleteProductThunk]: {};
  [ProductsThunkType.getAllVariations]: { refreshCurrent?: boolean; data: IVariation[] };
  [ProductsThunkType.getAllPrices]: { refreshCurrent?: boolean; data: IPriceListItem[] };
  [ProductsThunkType.getAllInventories]: { refreshCurrent?: boolean; data: IProductInventory[] };
}
export const getAllProductsThunk = createAsyncThunk<
  { refresh?: boolean; data?: IProduct[] },
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    IProduct[]
  >
>(ProductsThunkType.getAllProductsThunk, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
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

export const getProductFullInfoThunk = createAsyncThunk<
  IProduct,
  ThunkPayload<OnlyUUID & { omit?: [keyof IProduct] }, IProduct>
>(ProductsThunkType.getProductFullInfoThunk, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const res = await ProductsApi.getFullInfoById(data?._id);
    if (res) {
      onSuccess && onSuccess(res.data.data);
    }

    return res.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  } finally {
    onLoading && onLoading(false);
  }
});

export const createProductThunk = createAsyncThunk<
  { data: IProduct } | undefined,
  ThunkPayload<IProductReqData, IProduct>
>(ProductsThunkType.createProductThunk, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await ProductsApi.create(args?.data);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data.data);
    }

    args?.onLoading && args?.onLoading(false);
    return { data: res?.data.data };
  } catch (error) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(error);
    return thunkApi.rejectWithValue(isAxiosError(error));
  }
});

export const updateProductThunk = createAsyncThunk<
  { data?: IProduct; refreshCurrent?: boolean } | undefined,
  ThunkPayload<IProductReqData & { refreshCurrent?: boolean }, IProduct>
>(ProductsThunkType.updateProductThunk, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await ProductsApi.updateById(args?.data);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data.data);
    }

    args?.onLoading && args?.onLoading(false);
    return { data: res?.data.data, refreshCurrent: args?.data?.refreshCurrent };
  } catch (error) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(error);
    return thunkApi.rejectWithValue(isAxiosError(error));
  }
});
export const deleteProductThunk = createAsyncThunk(
  ProductsThunkType.deleteProductThunk,
  createThunkPayloadCreator(ProductsApi.deleteById, ProductsApi)
);
export const getAllPricesByProductIdThunk = createAsyncThunk<
  ProductThunkReturnDataByType['products/getAllPrices'],
  ProductThunkPayloadByType['products/getAllPrices']
>(ProductsThunkType.getAllPrices, async (args, thunkApi) => {
  try {
    const res = await PriceManagementApi.getAllPrices(args?.data?.params);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data.data);
    }

    args?.onLoading && args?.onLoading(false);
    return { data: res?.data.data, refreshCurrent: args?.data?.refreshCurrent };
  } catch (error) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(error);
    return thunkApi.rejectWithValue(isAxiosError(error));
  }
});
export const getAllInventoriesByProductIdThunk = createAsyncThunk<
  ProductThunkReturnDataByType['products/getAllInventories'],
  ProductThunkPayloadByType['products/getAllInventories']
>(ProductsThunkType.getAllInventories, async (args, thunkApi) => {
  try {
    const res = await WarehousesApi.getAllInventories(args?.data?.params);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data.data);
    }

    args?.onLoading && args?.onLoading(false);
    return { data: res?.data.data, refreshCurrent: args?.data?.refreshCurrent };
  } catch (error) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(error);
    return thunkApi.rejectWithValue(isAxiosError(error));
  }
});
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

// TODO payload creator

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
