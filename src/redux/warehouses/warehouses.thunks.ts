import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkArgs } from '../store.store';
import { ApiQueryParams, createApiCall, WarehousesApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { IWarehouseReqData, WarehouseEntity } from '../../types/warehousing/warehouses.types';
import { OnlyUUID } from '../app-redux.types';

enum WarehousingThunkType {
  getAll = 'warehouses/getAllWarehousesThunk',
  create = 'warehouses/createWarehouseThunk',
  getById = 'warehouses/getWarehouseByIdThunk',
  addItemsToWarehouseThunk = 'warehouses/addItemsToWarehouseThunk',
}
export const getAllWarehousesThunk = createAsyncThunk<
  | {
      refresh?: boolean;
      query?: ApiQueryParams;
      data: WarehouseEntity[];
    }
  | undefined,
  ThunkArgs<
    {
      refresh?: boolean;
      query?: ApiQueryParams;
    },
    WarehouseEntity[]
  >
>(WarehousingThunkType.getAll, async (payload, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = payload;

  onLoading && onLoading(true);

  try {
    const res = await createApiCall(
      {
        data: data?.query,
        logError: true,
      },
      WarehousesApi.getAll,
      WarehousesApi
    );
    if (res?.data.data) {
      onSuccess && onSuccess(res?.data.data);
    }
    onLoading && onLoading(false);
    return { ...data, data: res?.data.data || [] };
  } catch (e) {
    onLoading && onLoading(false);
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});
export const createWarehouseThunk = createAsyncThunk<WarehouseEntity, ThunkArgs<IWarehouseReqData, WarehouseEntity>>(
  WarehousingThunkType.create,
  async (arg, thunkAPI) => {
    const { data, onLoading, onSuccess, onError } = arg;

    onLoading && onLoading(true);

    try {
      const res = await WarehousesApi.createWarehouse(data);
      if (res?.data.data) {
        onSuccess && onSuccess(res?.data.data);
      }
      onLoading && onLoading(false);
      return res?.data.data;
    } catch (e) {
      onLoading && onLoading(false);
      onError && onError(e);
      return thunkAPI.rejectWithValue(axiosErrorCheck(e));
    }
  }
);

export const getWarehouseByIdThunk = createAsyncThunk<
  WarehouseEntity | undefined,
  ThunkArgs<OnlyUUID, WarehouseEntity>
>(WarehousingThunkType.getById, async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await WarehousesApi.getById(data);

    if (res?.data.data) {
      onSuccess && onSuccess(res?.data?.data);
    }
    onLoading && onLoading(false);
    return res?.data?.data;
  } catch (e) {
    onLoading && onLoading(false);
    onError && onError(e);
    return thunkAPI.rejectWithValue(axiosErrorCheck(e));
  }
});

// export const refreshPriceListByIdThunk = createAsyncThunk<IWarehouse | undefined, ThunkPayload<OnlyUUID, IWarehouse>>(
//   'warehouseWarehousingThunkType.'
//   async (arg, thunkAPI) => {
//     const { data, onLoading, onSuccess, onError } = arg;
//
//     onLoading && onLoading(true);
//
//     try {
//       const res = await createApiCall(
//         {
//           data,
//           logRes: true,
//           logError: true,
//         },
//         WarehousesApi.getPriceListById,
//         WarehousesApi
//       );
//       if (res?.data.data) {
//         onSuccess && onSuccess(res?.data.data);
//       }
//       onLoading && onLoading(false);
//       return res?.data.data;
//     } catch (e) {
//       onLoading && onLoading(false);
//       onError && onError(e);
//       return thunkAPI.rejectWithValue(axiosErrorCheck(e));
//     }
//   }
// );
// export const updatePriceListByIdThunk = createAsyncThunk<
//   IWarehouse | undefined,
//   ThunkPayload<IWarehouseReqData, IWarehouse>
// >('warehouseWarehousingThunkType.' async (arg, thunkAPI) => {
//   const { data, onLoading, onSuccess, onError } = arg;
//
//   onLoading && onLoading(true);
//
//   try {
//     const res = await createApiCall(
//       {
//         data,
//         logRes: true,
//         logError: true,
//       },
//       WarehousesApi.updatePriceList,
//       WarehousesApi
//     );
//     if (res?.data.data) {
//       onSuccess && onSuccess(res?.data.data);
//     }
//     onLoading && onLoading(false);
//     return res?.data.data;
//   } catch (e) {
//     onLoading && onLoading(false);
//     onError && onError(e);
//     return thunkAPI.rejectWithValue(axiosErrorCheck(e));
//   }
// });
// export const addPriceToListThunk = createAsyncThunk<
//   IWarehouse | undefined,
//   ThunkPayload<ICreatePriceListItemReqData, IWarehouse>
// >('warehouseWarehousingThunkType.' async (arg, thunkAPI) => {
//   const { data, onLoading, onSuccess, onError } = arg;
//
//   onLoading && onLoading(true);
//
//   try {
//     const res = await createApiCall(
//       {
//         data,
//         logRes: true,
//         logError: true,
//       },
//       WarehousesApi.addItemToList,
//       WarehousesApi
//     );
//     if (res?.data.data) {
//       onSuccess && onSuccess(res?.data.data);
//     }
//     onLoading && onLoading(false);
//     return res?.data.data;
//   } catch (e) {
//     onLoading && onLoading(false);
//     onError && onError(e);
//     return thunkAPI.rejectWithValue(axiosErrorCheck(e));
//   }
// });

export const addItemsToWarehouseThunk = createAsyncThunk(WarehousingThunkType.addItemsToWarehouseThunk, async () => {});
