import { PriceManagementApi } from '../../../api';
import { createAppAsyncThunk } from '../../createAppAsynkThunk';

// export const buildGetAllDiscountsThunk = (type: string) =>
//   createAsyncThunk<ActionPayload<{ data: PriceDiscountEntity[] }>, ThunkPayload<{ params: AppQueryParams }>>(
//     type,
//     async (arg, thunkAPI) => {
//       arg?.onLoading && arg?.onLoading(true);
//       try {
//         const res = await PriceManagementApi.discounts.getAll(arg?.data?.params);
//         if (res) {
//           arg?.onSuccess && arg?.onSuccess(res?.data.data);
//         }
//
//         return { ...arg?.data, data: res?.data.data };
//       } catch (error) {
//         arg?.onError && arg?.onError(error);
//         return thunkAPI.rejectWithValue(isAxiosError(error));
//       } finally {
//         arg?.onLoading && arg?.onLoading(false);
//       }
//     }
//   );

export enum DiscountsThunkTypeEnum {
  getAll = 'discounts/getAllThunk',
  create = 'discounts/createOneThunk',
  update = 'discounts/updateOneThunk',
  getOne = 'discounts/getOneThunk',
  remove = 'discounts/removeThunk',
}

export const buildGetAllDiscountsThunk = (type: string = DiscountsThunkTypeEnum.getAll) =>
  createAppAsyncThunk(type, PriceManagementApi.discounts.getAll);

export const getAllDiscountsThunk = buildGetAllDiscountsThunk();

export const createDiscountThunk = createAppAsyncThunk(
  DiscountsThunkTypeEnum.create,
  PriceManagementApi.discounts.create
);
export const updateDiscountThunk = createAppAsyncThunk(
  DiscountsThunkTypeEnum.update,
  PriceManagementApi.discounts.update
);

export const getDiscountThunk = createAppAsyncThunk(DiscountsThunkTypeEnum.getOne, PriceManagementApi.discounts.getOne);
export const removeDiscountThunk = createAppAsyncThunk(
  DiscountsThunkTypeEnum.remove,
  PriceManagementApi.discounts.remove
);
