import { StateErrorType } from '../reduxTypes.types';
import { IShipment } from './shipments.types';
import { createSlice } from '@reduxjs/toolkit';

export interface ShipmentsState {
  shipments: IShipment[];
  error: StateErrorType | null;
  isLoading: boolean;
}
const state: ShipmentsState = {
  shipments: [],
  error: null,
  isLoading: false,
};
export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState: state,
  reducers: {},
  extraReducers: builder => builder,
});
