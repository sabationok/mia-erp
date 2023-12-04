import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder, IOrderReqData, IOrderSlot } from '../../types/orders/orders.types';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, createApiCall, OrdersApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { OnlyUUID } from '../global.types';
import { buildGetAllInvoicesThunk } from '../invoices/invoicing.thunks';
import { buildGetAllDeliveriesThunk } from '../deliveries/deliveries.thunks';
import { buildGetAllPaymentsThunk } from '../payments/payments.thunks';

enum OrdersThunkTypeEnum {
  getAll = 'orders/getAllOrdersThunk',
  createOne = 'orders/createOrderThunk',
  getAllInvoices = 'orders/getAllInvoicesByOrderThunk',
  getAllDeliveries = 'orders/getAllDeliveriesByOrderThunk',
  getAllPayments = 'orders/getAllPaymentsByOrderThunk',
  getSlots = 'orders/getOrderSlotsThunk',
}
export const getAllOrdersThunk = createAsyncThunk<
  { refresh?: boolean; data?: IOrder[] },
  ThunkPayload<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    IOrder[]
  >
>(OrdersThunkTypeEnum.getAll, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const response = await OrdersApi.getAll(data?.query);

    onSuccess && onSuccess(response.data.data);

    onLoading && onLoading(false);
    return { data: response.data.data, refresh: data?.refresh };
  } catch (error) {
    onError && onError(error);

    onLoading && onLoading(false);
    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const createOrderThunk = createAsyncThunk<IOrder | undefined, ThunkPayload<IOrderReqData, IOrder>>(
  OrdersThunkTypeEnum.createOne,
  async (args, thunkApi) => {
    try {
      const res = await createApiCall(
        {
          ...args,
          logRes: true,
          throwError: true,
        },
        OrdersApi.createOne,
        OrdersApi
      );

      return res?.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(axiosErrorCheck(error));
    }
  }
);
export const getOrderByIdThunk = createAsyncThunk<
  { data: IOrder; refreshCurrent?: boolean },
  ThunkPayload<OnlyUUID & { params?: { fullInfo?: boolean }; options?: { refreshCurrent?: boolean } }, IOrder>
>('orders/getOrderByIdThunk', async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await OrdersApi.getById(args.data);
    if (res && args?.onSuccess) {
      args.onSuccess(res.data?.data, res?.data?.meta);
    }

    return { ...res?.data, ...args.data?.options };
  } catch (error) {
    return thunkApi.rejectWithValue(axiosErrorCheck(error));
  } finally {
    args?.onLoading && args?.onLoading(false);
  }
});
export const getOrderSlotsThunk = createAsyncThunk<
  { update?: boolean; data: IOrderSlot[] },
  ThunkPayload<{ update?: boolean; params?: Pick<AppQueryParams, 'order' | 'group'> }, IOrderSlot[]>
>(OrdersThunkTypeEnum.getSlots, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await OrdersApi.getSlots(args.data);
    if (res) {
      args?.onSuccess && args?.onSuccess(res?.data?.data);
    }
    return { ...res?.data, ...args?.data };
  } catch (error) {
    return thunkApi.rejectWithValue(axiosErrorCheck(error));
  } finally {
    args?.onLoading && args?.onLoading(false);
  }
});
export const getAllInvoicesByOrderThunk = buildGetAllInvoicesThunk(OrdersThunkTypeEnum.getAllInvoices);
export const getAllDeliveriesByOrderThunk = buildGetAllDeliveriesThunk(OrdersThunkTypeEnum.getAllDeliveries);
export const getAllPaymentsByOrderThunk = buildGetAllPaymentsThunk(OrdersThunkTypeEnum.getAllPayments);
