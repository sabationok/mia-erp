import { StateMaps } from '../createStateMapsManager.helper';
import { OAuth } from '../../types/auth/o-auth.namespace';
import { createSlice } from '@reduxjs/toolkit';
import { AppModuleName } from '../reduxTypes.types';
import { createOAuthConnectionThunk, getAllOAuthConnectionsThunk, updateOAuthConnectionThunk } from './o-auth.thunks';
import { onUserLogoutMatch } from './auth.actions';
import { sliceCleaner, updateIdsArray } from '../../utils';

export interface OAuthState extends StateMaps<OAuth.Connection.Entity> {}
export const state: OAuthState = {
  dataMap: {},
  keysMap: {},
  list: [],
};
export const oAuthSlice = createSlice({
  name: AppModuleName.oauth,
  reducers: {},
  initialState: state,
  extraReducers: builder =>
    builder
      .addCase(updateOAuthConnectionThunk.fulfilled, () => {})
      .addCase(createOAuthConnectionThunk.fulfilled, (st, { payload: { data } }) => {
        st.list = st.list.concat([data]);

        st.dataMap[data._id] = data;

        const consumerId = data.consumer?._id;
        if (consumerId) {
          st.keysMap[consumerId] = updateIdsArray({ arr: st.keysMap[consumerId], id: data._id });
        }
      })
      .addCase(getAllOAuthConnectionsThunk.fulfilled, (st, { payload: { data, update } }) => {
        st.list = update ? st.list.concat(data) : data;
      })
      .addMatcher(onUserLogoutMatch, sliceCleaner(state, { name: AppModuleName.oauth })),
});
