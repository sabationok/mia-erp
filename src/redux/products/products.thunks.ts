import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { ActionPayload, ThunkPayload } from '../store.store';
import { isAxiosError } from 'axios';
import { IOfferDefaultsDto, IProductReqData, OfferEntity } from '../../types/offers/offers.types';
import { AppQueryParams, GetOneOfferQuery, WarehousesApi } from '../../api';
import OffersApi from '../../api/offers.api';
import { OnlyUUID } from '../app-redux.types';
import _ from 'lodash';
import { buildGetAllPricesThunk } from '../priceManagement/priceManagement.thunks';
import { WarehouseInventoryEntity } from '../../types/warehousing/warehouse-inventory.types';

enum ProductsThunkType {
  getAllProductsThunk = 'products/getAllProductsThunk',
  getProductFullInfoThunk = 'products/getProductFullInfoThunk',
  getOne = 'products/getOneThunk',
  createProductThunk = 'products/createProductThunk',
  updateProductThunk = 'products/updateProductThunk',
  deleteProductThunk = 'products/deleteProductThunk',

  getAllVariations = 'products/getAllVariations',

  getAllPrices = 'products/getAllPrices',

  getAllInventories = 'products/getAllInventories',

  updateDefaults = 'products/updateDefaultsByIdThunk',
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

export const getOfferThunk = createAsyncThunk<
  ActionPayload<{ data: OfferEntity }>,
  ThunkPayload<{ params?: GetOneOfferQuery }, { data: OfferEntity }>
>(ProductsThunkType.getOne, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const res = await OffersApi.getOne(data);
    if (res) {
      onSuccess && onSuccess(res.data);
    }

    return { ...data, data: res.data.data };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  } finally {
    onLoading && onLoading(false);
  }
});

export const getOfferFullInfoThunk = createAsyncThunk<
  ActionPayload<{ data: OfferEntity }>,
  ThunkPayload<OnlyUUID & { omit?: [keyof OfferEntity] }, OfferEntity>
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
  ActionPayload<{ data?: OfferEntity }>,
  ThunkPayload<IProductReqData, OfferEntity>
>(ProductsThunkType.updateProductThunk, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await OffersApi.updateById(args?.data);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data.data);
    }

    args?.onLoading && args?.onLoading(false);
    return { data: res?.data.data, refreshCurrent: args?.data?.refresh };
  } catch (error) {
    args?.onLoading && args?.onLoading(false);
    args?.onError && args?.onError(error);
    return thunkApi.rejectWithValue(isAxiosError(error));
  }
});
export const updateOfferDefaultsThunk = createAsyncThunk<
  ActionPayload<{ data: OfferEntity }>,
  ThunkPayload<
    {
      _id: string;
      defaults: IOfferDefaultsDto;
      refreshCurrent?: boolean;
      updateCurrent?: boolean;
    },
    OfferEntity
  >
>(ProductsThunkType.updateDefaults, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);

  try {
    const res = await OffersApi.updateDefaultsById(args?.data);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data.data);
    }

    return { data: res?.data.data, refreshCurrent: args?.data?.refreshCurrent };
  } catch (error) {
    args?.onError && args?.onError(error);
    return thunkApi.rejectWithValue(isAxiosError(error));
  } finally {
    args?.onLoading && args?.onLoading(false);
  }
});
// export const deleteProductThunk = createAsyncThunk(
//   ProductsThunkType.deleteProductThunk,
//   createThunkPayloadCreator(OffersApi.deleteById)
// );
export const getAllOfferPricesThunk = buildGetAllPricesThunk(ProductsThunkType.getAllPrices);

export const getAllInventoriesByProductIdThunk = createAsyncThunk<
  ActionPayload<{ data: WarehouseInventoryEntity[] }>,
  ThunkPayload<
    {
      params?: Pick<AppQueryParams, 'warehouse' | 'warehouseId' | 'offer' | 'offerId' | 'variation' | 'variationId'>;
    },
    WarehouseInventoryEntity[]
  >
>(ProductsThunkType.getAllInventories, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await WarehousesApi.getAllInventories(args?.data?.params);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data.data);
    }

    return { data: res?.data.data, refreshCurrent: args?.data?.refresh };
  } catch (error) {
    args?.onError && args?.onError(error);
    return thunkApi.rejectWithValue(isAxiosError(error));
  } finally {
    args?.onLoading && args?.onLoading(false);
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
