import { RefundsManagementApi } from '../../api';
import { createAppAsyncThunk2 } from '../createAppAsynkThunk2';

enum ThunkType {
  create = 'refunds/create/thunk',
  getOne = 'refunds/getOne/thunk',
  getAll = 'refunds/getAll/thunk',
  update = 'refunds/update/thunk',
}

export const getAllRefundsThunk = createAppAsyncThunk2(ThunkType.getAll, RefundsManagementApi.refunds.getAll);
export const createRefundThunk = createAppAsyncThunk2(ThunkType.create, RefundsManagementApi.refunds.create);
export const getRefundThunk = createAppAsyncThunk2(ThunkType.getOne, RefundsManagementApi.refunds.getOne);
export const updateRefundThunk = createAppAsyncThunk2(ThunkType.update, RefundsManagementApi.refunds.update);
