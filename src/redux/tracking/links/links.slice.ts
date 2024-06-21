import { createSlice } from '@reduxjs/toolkit';
import { TrackingLinkEntity } from '../../../types/tracking';
import { getAllLinksThunk } from './links.thunks';

export type LinksState = {
  list: TrackingLinkEntity[];
};
const initState: LinksState = {
  list: [],
};
export const linksSlice = createSlice({
  name: 'tracking/links',
  initialState: initState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(getAllLinksThunk.fulfilled, (st, a) => {
      st.list = a.payload.data;
      return;
    }),
});
