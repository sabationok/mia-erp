import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrderReqData, OrderEntity } from '../../types/orders/orders.types';
import { ThunkArgs } from '../store.store';
import { AppQueryParams, createApiCall, OrdersApi } from '../../api';
import { axiosErrorCheck } from '../../utils';
import { OnlyUUID } from '../app-redux.types';
import { buildGetAllInvoicesThunk } from '../invoices/invoicing.thunks';
import { buildGetAllDeliveriesThunk } from '../deliveries/deliveries.thunks';
import { buildGetAllPaymentsThunk } from '../payments/payments.thunks';
import { OrderSlotEntity } from '../../types/orders/order-slot.types';

enum OrdersThunkTypeEnum {
  getAll = 'orders/getAllOrdersThunk',
  createOne = 'orders/createOrderThunk',
  getAllInvoices = 'orders/getAllInvoicesByOrderThunk',
  getAllDeliveries = 'orders/getAllDeliveriesByOrderThunk',
  getAllPayments = 'orders/getAllPaymentsByOrderThunk',
  getSlots = 'orders/getOrderSlotsThunk',
}
export const getAllOrdersThunk = createAsyncThunk<
  { refresh?: boolean; data?: OrderEntity[] },
  ThunkArgs<
    {
      refresh?: boolean;
      query?: AppQueryParams;
    },
    OrderEntity[]
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

export const createOrderThunk = createAsyncThunk<OrderEntity | undefined, ThunkArgs<IOrderReqData, OrderEntity>>(
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
  { data: OrderEntity; refreshCurrent?: boolean },
  ThunkArgs<OnlyUUID & { params?: { fullInfo?: boolean }; options?: { refreshCurrent?: boolean } }, OrderEntity>
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
  { update?: boolean; data: OrderSlotEntity[] },
  ThunkArgs<{ update?: boolean; params?: Pick<AppQueryParams, 'order' | 'group'> }, OrderSlotEntity[]>
>(OrdersThunkTypeEnum.getSlots, async (args, thunkApi) => {
  args?.onLoading && args?.onLoading(true);
  try {
    const res = await OrdersApi.slots.getAll(undefined, args.data);
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
