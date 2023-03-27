import { createSlice } from '@reduxjs/toolkit';
import {
  getAllCountsThunk,
  getCountsByParentIdThunk,
  addCountThunk,
  deleteCountThunk,
  editCountThunk,
} from 'redux/counts/counts.thunks';
const initialState = {
  isLoading: false,
  error: null,
  counts: [],
};

export const countsSlice = createSlice({
  name: 'counts',
  initialState,
  extraReducers: {
    [getAllCountsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.counts = action.payload.data;
    },
    [getAllCountsThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllCountsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getCountsByParentIdThunk.fulfilled]: (state, action) => {},
    [getCountsByParentIdThunk.pending]: (state, action) => {},
    [getCountsByParentIdThunk.rejected]: (state, action) => {},

    [addCountThunk.fulfilled]: (state, action) => {
      state.isloading = false;
      state.counts.push(action.payload.data);
    },
    [addCountThunk.pending]: (state, action) => {
      state.isloading = true;
    },
    [addCountThunk.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    [deleteCountThunk.fulfilled]: (state, action) => {},
    [deleteCountThunk.pending]: (state, action) => {},
    [deleteCountThunk.rejected]: (state, action) => {},

    [editCountThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const index = state.counts.findIndex(el => el._id === payload.data._id);

      state.counts[index] = { ...payload.data };

      console.log(index, state.counts[index].isArchived);
    },
    [editCountThunk.pending]: (state, action) => {},
    [editCountThunk.rejected]: (state, action) => {},
  },
});

export const countsReducer = countsSlice.reducer;
