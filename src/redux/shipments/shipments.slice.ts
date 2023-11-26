import { StateErrorType } from '../reduxTypes.types';
import { IShipment } from './shipments.types';
import { createSlice } from '@reduxjs/toolkit';
import { getAllDeliveryMethodsThunk, updateShipmentMethodThunk } from './shipments.thunks';
import { IDeliveryMethod } from '../../types/integrations.types';

export interface ShipmentsState {
  shipments: IShipment[];
  methods: IDeliveryMethod[];
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
      .addCase(getAllDeliveryMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updateShipmentMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? a.payload : mtd));
      }),
});
