import { OrdersApi } from '../../api';
import { buildGetAllInvoicesThunk } from '../invoices/invoicing.thunks';
import { buildGetAllDeliveriesThunk } from '../deliveries/deliveries.thunks';
import { buildGetAllPaymentsThunk } from '../payments/payments.thunks';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum OrdersThunkTypeEnum {
  getAll = 'orders/getAllOrdersThunk',
  createOne = 'orders/createOrderThunk',
  getAllInvoices = 'orders/getAllInvoicesByOrderThunk',
  getAllDeliveries = 'orders/getAllDeliveriesByOrderThunk',
  getAllPayments = 'orders/getAllPaymentsByOrderThunk',
  getSlots = 'orders/getOrderSlotsThunk',
}

export enum OrdersThunkType {
  addGroup = 'orders/addGroupThunk',
  getListByQuery = 'orders/getListThunk',
  getOneByQuery = 'orders/getOneThunk',
  getOneById = 'orders/getOneByIdThunk',
  getPaymentsList = 'orders/getPaymentsListThunk',
  getDeliveryById = 'orders/getDeliveriesInfoThunk',
  reject = 'orders/rejectThunk',
  confirmReject = 'orders/confirmRejectThunk',
  abortReject = 'orders/abortRejectThunk',
}

export const addOrdersGroup = createAppAsyncThunk(OrdersThunkType.addGroup, OrdersApi.groups.createGroupedByWarehouse);

export const getOrdersListByQueryThunk = createAppAsyncThunk(OrdersThunkType.getListByQuery, OrdersApi.getAll);

export const getOrderThunk = createAppAsyncThunk(OrdersThunkType.getOneByQuery, OrdersApi.getOne);

export const getOrderByIdThunk = createAppAsyncThunk(OrdersThunkType.getOneById, OrdersApi.getById);
export const getAllOrdersThunk = createAppAsyncThunk(OrdersThunkTypeEnum.getAll, OrdersApi.getAll);

export const getOrderSlotsThunk = createAppAsyncThunk(OrdersThunkTypeEnum.getSlots, OrdersApi.slots.getAll);
export const getAllInvoicesByOrderThunk = buildGetAllInvoicesThunk(OrdersThunkTypeEnum.getAllInvoices);
export const getAllDeliveriesByOrderThunk = buildGetAllDeliveriesThunk(OrdersThunkTypeEnum.getAllDeliveries);
export const getAllPaymentsByOrderThunk = buildGetAllPaymentsThunk(OrdersThunkTypeEnum.getAllPayments);

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
