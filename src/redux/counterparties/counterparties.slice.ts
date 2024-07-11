import { CounterpartyEntity } from '../../types/counterparty/counterparty.types';
import { createSlice } from '@reduxjs/toolkit';

export interface CounterpartiesState {
  list?: CounterpartyEntity[];
  dataMap?: Record<string, CounterpartyEntity>;
}

const initState: CounterpartiesState = {
  list: [],
  dataMap: {},
};

export const counterpartiesState = createSlice({
  name: 'counterparties',
  initialState: initState,
  reducers: {},
  extraReducers: builder => builder,
});
