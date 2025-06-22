import { OrdersApi } from '../../api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum OrdersThunkTypeEnum {
  getOne = 'orders/get/one/Thunk',
  getAll = 'orders/get/all/Thunk',
  create = 'orders/create/one/Thunk',

  reject_request = 'orders/reject/request/Thunk',
  reject_abort = 'orders/reject/abort/Thunk',
  reject_confirm = 'orders/reject/confirm/Thunk',

  slots_add = 'orders/slots/add/thunk',
  slots_getAll = 'orders/slots/get/all/thunk',
  slots_getOne = 'orders/slots/get/one/thunk',
  slots_remove = 'orders/slots/remove/thunk',
  slots_update = 'orders/slots/update/thunk',
}

export const getOrderThunk = createAppAsyncThunk(OrdersThunkTypeEnum.getOne, OrdersApi.getOne);
export const getAllOrdersThunk = createAppAsyncThunk(OrdersThunkTypeEnum.getAll, OrdersApi.getAll);

export const getOrderSlotsThunk = createAppAsyncThunk(OrdersThunkTypeEnum.slots_getAll, OrdersApi.slots.getAll);
export const getOrderSlotThunk = createAppAsyncThunk(OrdersThunkTypeEnum.slots_getOne, OrdersApi.slots.getAll);
export const addOrderSlotThunk = createAppAsyncThunk(OrdersThunkTypeEnum.slots_add, OrdersApi.slots.create);
export const updateOrderSlotThunk = createAppAsyncThunk(OrdersThunkTypeEnum.slots_update, OrdersApi.slots.update);
export const removeOrderSlotThunk = createAppAsyncThunk(OrdersThunkTypeEnum.slots_remove, OrdersApi.slots.remove);

// export const softRemoveOrderThunk = createAppAsyncThunk(
//   OrdersThunkType.getPaymentsList,
//   OrdersApi.softRemoveOrder
//   // (...args: Parameters<(typeof OrdersApi)['softRemoveOrder']>) =>
//   //   OrdersApi.softRemoveOrder(...args)
// );

// export const rejectOrderThunk = createAppAsyncThunk(
//   OrdersThunkType.reject,
//   OrdersApi.rejectOrder
//   //  async (data?: { _id: string }) => {
//   //    return axios(`/api/reject-order/${data?._id}`, {
//   //      url: `/api/reject-order/${data?._id}`,
//   //      params: {
//   //        orderId: data?._id,
//   //      },
//   //    });
//   //  }
// );

// export const confirmRejectOrderThunk = createAppAsyncThunk(
//   OrdersThunkType.confirmReject,
//   OrdersApi.rejectConfirm
//
//   // ! not delete (...args: Parameters<(typeof OrdersApi)['rejectConfirm']>) =>
//   // ! not delete   OrdersApi.rejectConfirm(...args)
// );

// export const abortRejectOrderThunk = createAppAsyncThunk(
//   OrdersThunkType.abortReject,
//   OrdersApi.rejectAbort
//   //   (...args: Parameters<(typeof OrdersApi)['rejectAbort']>) =>
//   //     OrdersApi.rejectAbort(...args)
// );
