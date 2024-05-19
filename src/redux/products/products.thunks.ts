import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { isAxiosError } from 'axios';
import { IProductReqData, OfferEntity } from '../../types/offers/offers.types';
import { AppQueryParams, PriceManagementApi, WarehousesApi } from '../../api';
import { createThunkPayloadCreator } from '../../api/createApiCall.api';
import OffersApi from '../../api/offersApi';
import { OnlyUUID } from '../global.types';
import { OfferPriceEntity } from '../../types/price-management/priceManagement.types';
import { WarehouseItemEntity } from '../../types/warehouses.types';
import { VariationEntity } from '../../types/offers/variations.types';
import _ from 'lodash';

enum ProductsThunkType {
  getAllProductsThunk = 'products/getAllProductsThunk',
  getProductFullInfoThunk = 'products/getProductFullInfoThunk',
  createProductThunk = 'products/createProductThunk',
  updateProductThunk = 'products/updateProductThunk',
  deleteProductThunk = 'products/deleteProductThunk',

  getAllVariations = 'products/getAllVariations',

  getAllPrices = 'products/getAllPrices',

  getAllInventories = 'products/getAllInventories',

  updateDefaultsById = 'products/updateDefaultsByIdThunk',
}
type ActionWithCurrent = { refreshCurrent?: boolean; updateCurrent?: boolean };
export interface ProductThunkPayloadByType {
  [ProductsThunkType.getAllProductsThunk]: {};
  [ProductsThunkType.getProductFullInfoThunk]: {};
  [ProductsThunkType.createProductThunk]: {};
  [ProductsThunkType.updateProductThunk]: {};
  [ProductsThunkType.deleteProductThunk]: {};
  [ProductsThunkType.getAllVariations]: ThunkPayload<
    ActionWithCurrent & { params?: Pick<AppQueryParams, 'list' | 'offer' | 'variation'> },
    VariationEntity[]
  >;
  [ProductsThunkType.getAllPrices]: ThunkPayload<
    ActionWithCurrent & { params?: Pick<AppQueryParams, 'list' | 'offer' | 'variation'> },
    OfferPriceEntity[]
  >;
  [ProductsThunkType.getAllInventories]: ThunkPayload<
    ActionWithCurrent & { params?: Pick<AppQueryParams, 'price' | 'offer' | 'variation' | 'warehouse'> },
    WarehouseItemEntity[]
  >;
}
export interface ProductThunkReturnDataByType {
  [ProductsThunkType.getAllProductsThunk]: {};
  [ProductsThunkType.getProductFullInfoThunk]: {};
  [ProductsThunkType.createProductThunk]: {};
  [ProductsThunkType.updateProductThunk]: {};
  [ProductsThunkType.deleteProductThunk]: {};
  [ProductsThunkType.getAllVariations]: ActionWithCurrent & { data: VariationEntity[] };
  [ProductsThunkType.getAllPrices]: ActionWithCurrent & { data: OfferPriceEntity[] };
  [ProductsThunkType.getAllInventories]: ActionWithCurrent & { data: WarehouseItemEntity[] };
}
export const getAllProductsThunk = createAsyncThunk<
  { refresh?: boolean; data?: OfferEntity[] },
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    OfferEntity[]
  >
>(ProductsThunkType.getAllProductsThunk, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const response = await OffersApi.getAll(data?.query);

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
  ActionWithCurrent & { data: OfferEntity },
  ThunkPayload<OnlyUUID & ActionWithCurrent & { omit?: [keyof OfferEntity] }, OfferEntity>
>(ProductsThunkType.getProductFullInfoThunk, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const res = await OffersApi.getFullInfoById(data?._id);
    if (res) {
      onSuccess && onSuccess(res.data.data);
    }

    return { data: res.data.data, ..._.pick(data, ['refreshCurrent', 'updateCurrent']) };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  } finally {
    onLoading && onLoading(false);
  }
});

export const createProductThunk = createAsyncThunk<
  { data: OfferEntity } | undefined,
  ThunkPayload<IProductReqData, OfferEntity>
>(ProductsThunkType.createProductThunk, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await OffersApi.create(args?.data);
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
  (ActionWithCurrent & { data?: OfferEntity }) | undefined,
  ThunkPayload<IProductReqData & ActionWithCurrent, OfferEntity>
>(ProductsThunkType.updateProductThunk, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await OffersApi.updateById(args?.data);
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
export const updateProductDefaultsThunk = createAsyncThunk<
  (ActionWithCurrent & { data?: OfferEntity }) | undefined,
  ThunkPayload<IProductReqData & ActionWithCurrent, OfferEntity>
>(ProductsThunkType.updateDefaultsById, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await OffersApi.updateDefaultsById(args?.data);
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
  createThunkPayloadCreator(OffersApi.deleteById, OffersApi)
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
