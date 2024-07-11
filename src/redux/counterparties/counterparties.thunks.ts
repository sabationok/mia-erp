import { createAppAsyncThunk } from '../createAppAsynkThunk';
import { CounterpartiesApi } from '../../api';

export enum CounterpartyThunkType {
  create = 'counterparties/createOneThunk',
  getAll = 'counterparties/createOneThunk',
  getOne = 'counterparties/createOneThunk',
  request = 'counterparties/requestConnectionThunk',
  reject = 'counterparties/rejectConnectionThunk',
  accept = 'counterparties/acceptConnectionThunk',
}

export const createCounterpartyThunk = createAppAsyncThunk(CounterpartyThunkType.create, CounterpartiesApi.create);
export const updateCounterpartyThunk = createAppAsyncThunk(CounterpartyThunkType.accept, CounterpartiesApi.create);
export const getAllCounterpartiesThunk = createAppAsyncThunk(CounterpartyThunkType.accept, CounterpartiesApi.create);
export const counterpartyConnectionRequestThunk = createAppAsyncThunk(
  CounterpartyThunkType.accept,
  CounterpartiesApi.create
);
export const counterpartyConnectionRejectThunk = createAppAsyncThunk(
  CounterpartyThunkType.accept,
  CounterpartiesApi.create
);
export const createCounterpartyConnectionRequestThunk = createAppAsyncThunk(
  CounterpartyThunkType.accept,
  CounterpartiesApi.create
);
