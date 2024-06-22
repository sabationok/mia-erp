import { StateErrorType } from '../reduxTypes.types';

import { createSlice } from '@reduxjs/toolkit';
import { getAllDeliveriesThunk, getAllDeliveryMethodsThunk, updateDeliveryMethodThunk } from './deliveries.thunks';
import { IDeliveryMethod } from '../../types/integrations.types';
import { IDelivery } from '../../types/deliveries.types';
import { onUserLogout } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';

export interface DeliveriesState {
  deliveries: IDelivery[];
  methods: IDeliveryMethod[];
  error: StateErrorType | null;
  isLoading: boolean;
}

const initState: DeliveriesState = {
  deliveries: [],
  methods: [],
  error: null,
  isLoading: false,
};
export const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState: initState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllDeliveryMethodsThunk.fulfilled, (s, a) => {
        s.methods = a.payload;
      })
      .addCase(updateDeliveryMethodThunk.fulfilled, (s, a) => {
        s.methods = s.methods.map(mtd => (mtd._id === a.payload._id ? { ...mtd, ...a.payload } : mtd));
      })
      .addCase(getAllDeliveriesThunk.fulfilled, (s, a) => {
        if (a.payload?.update) {
          s.deliveries.concat(a.payload.data ?? []);
        } else {
          s.deliveries = a.payload?.data;
        }
      })
      .addMatcher(onUserLogout, sliceCleaner(initState)),
});
