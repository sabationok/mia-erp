import { createSlice } from '@reduxjs/toolkit';
import {
  getAllContractorsThunk,
  getContractorsByParentIdThunk,
  addContractorThunk,
  deleteContractorThunk,
  editContractorThunk,
} from 'redux/contractors/contractors.thunks';
const initialState = {
  isLoading: false,
  error: null,
  contractors: [],
};

export const contractorsSlice = createSlice({
  name: 'contractors',
  initialState,
  extraReducers: {
    [getAllContractorsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.contractors = action.payload.data;
    },
    [getAllContractorsThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllContractorsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getContractorsByParentIdThunk.fulfilled]: (state, action) => {},
    [getContractorsByParentIdThunk.pending]: (state, action) => {},
    [getContractorsByParentIdThunk.rejected]: (state, action) => {},

    [addContractorThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.contractors.push(action.payload.data);
    },
    [addContractorThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addContractorThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContractorThunk.fulfilled]: (state, action) => {},
    [deleteContractorThunk.pending]: (state, action) => {},
    [deleteContractorThunk.rejected]: (state, action) => {},

    [editContractorThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const index = state.contractors.findIndex(el => el._id === payload.data._id);

      state.contractors[index] = { ...payload.data };

      console.log(index, state.contractors[index].isArchived);
    },
    [editContractorThunk.pending]: (state, action) => {},
    [editContractorThunk.rejected]: (state, action) => {},
  },
});

export const contractorsReducer = contractorsSlice.reducer;
