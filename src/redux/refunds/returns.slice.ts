import { createSlice } from '@reduxjs/toolkit';
import { getAllRefundsThunk } from './returns.thunks';
import { onUserLogoutMatch } from '../auth/auth.actions';
import { sliceCleaner } from '../../utils';
import { AppModuleName, SliceMap } from '../reduxTypes.types';
import { UUID } from '../../types/utils.types';

export interface ReturnsState {
  returns: SliceMap<UUID, UUID, any>;
  filteredRefunds?: [];
  isLoading: boolean;
  error: any;
}
const initState: ReturnsState = {
  returns: {
    dataMap: {},
    keysMap: {},
    ids: [],
    list: [],
  },
  isLoading: false,
  error: null,
};

export const returnsSlice = createSlice({
  name: AppModuleName.returns,
  initialState: initState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllRefundsThunk.fulfilled, (_st, _a) => {
        // s.isLoading = false;
        // if (Array.isArray(a.payload.data)) {
        //   if (a.payload.refresh) {
        //     s.refunds = a.payload.data;
        //     return;
        //   }
        //   s.orders = [...a.payload.data, ...s.orders];
        // }
      })
      .addMatcher(onUserLogoutMatch, sliceCleaner(initState)),
});
