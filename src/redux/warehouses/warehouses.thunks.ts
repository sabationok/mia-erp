import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, createApiCall, WarehousesApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { IVariation, IWarehouse, IWarehouseReqData } from './warehouses.types';

export const getAllWarehousesThunk = createAsyncThunk<
  | {
      refresh?: boolean;
      query?: AppQueryParams;
      data: IVariation[];
    }
  | undefined,
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    IVariation[]
  >
>('warehouses/getAllWarehousesThunk', async (payload, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = payload;

  onLoading && onLoading(true);

  try {
    const res = await createApiCall(
      {
        data: data?.query,
        logError: true,
      },
      WarehousesApi.getAllWarehouses,
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
export const createWarehouseThunk = createAsyncThunk<
  IWarehouse | undefined,
  ThunkPayload<IWarehouseReqData, IWarehouse>
>('warehouses/createWarehouseThunk', async (arg, thunkAPI) => {
  const { data, onLoading, onSuccess, onError } = arg;

  onLoading && onLoading(true);

  try {
    const res = await createApiCall(
      {
        data: data,
        logRes: true,
        logError: true,
      },
      WarehousesApi.createWarehouse,
      WarehousesApi
    );
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
});

// export const refreshPriceListByIdThunk = createAsyncThunk<IWarehouse | undefined, ThunkPayload<OnlyUUID, IWarehouse>>(
//   'warehouses/refreshPriceListByIdThunk',
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
// >('warehouses/updatePriceListByIdThunk', async (arg, thunkAPI) => {
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
// >('warehouses/addPriceToListThunk', async (arg, thunkAPI) => {
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

export const addPricesToListThunk = createAsyncThunk('warehouses/addPricesToListThunk', async () => {});
