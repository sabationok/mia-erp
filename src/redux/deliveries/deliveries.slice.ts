import { StateErrorType } from '../reduxTypes.types';

import { createSlice } from '@reduxjs/toolkit';
import { getAllDeliveryMethodsThunk, updateDeliveryMethodThunk } from './deliveries.thunks';
import { IDeliveryMethod } from '../integrations/integrations.types';
import { IDelivery } from './deliveries.types';

export interface DeliveriesState {
  shipments: IDelivery[];
  methods: IDeliveryMethod[];
  error: StateErrorType | null;
  isLoading: boolean;
}

const state: DeliveriesState = {
  shipments: [],
  methods: [],
  error: null,
  isLoading: false,
};
export const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState: state,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllDeliveryMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updateDeliveryMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? a.payload : mtd));
      }),
});
