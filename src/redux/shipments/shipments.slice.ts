import { StateErrorType } from '../reduxTypes.types';
import { IShipment, IShipmentMethod } from './shipments.types';
import { createSlice } from '@reduxjs/toolkit';
import { getAllShipmentMethodsThunk, updateShipmentMethodThunk } from './shipments.thunks';

export interface ShipmentsState {
  shipments: IShipment[];
  methods: IShipmentMethod[];
  error: StateErrorType | null;
  isLoading: boolean;
}

const state: ShipmentsState = {
  shipments: [],
  methods: [],
  error: null,
  isLoading: false,
};
export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState: state,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllShipmentMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updateShipmentMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? a.payload : mtd));
      }),
});
