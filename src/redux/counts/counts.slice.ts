import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllCountsThunk } from 'redux/counts/counts.thunks';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { ICount } from 'data/counts.types';

export interface ICuntsState {
  counts: ICount[];
  isLoading: boolean;
  error: AuthErrorType;
}

const initialState: ICuntsState = {
  isLoading: false,
  error: null,
  counts: [],
};

export const countsSlice = createSlice({
  name: 'counts',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllCountsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.counts = action.payload.data;
      })
      .addMatcher(inPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(inError, (state, action: PayloadAction<AuthErrorType>) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

function inPending(action: AnyAction) {
  return action.type.endsWith('pending');
}
function inError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const countsReducer = countsSlice.reducer;
// .addCase(addCountThunk.fulfilled, (state, action) => {})
// .addCase(deleteCountThunk.fulfilled, (state, action) => {})
// .addCase(editCountThunk.fulfilled, (state, action) => {})
// extraReducers: {
//   [getAllCountsThunk.fulfilled]: (state, action) => {
//     state.isLoading = false;

//     state.counts = action.payload.data;
//   },
//   [getAllCountsThunk.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [getAllCountsThunk.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   [getCountsByParentIdThunk.fulfilled]: (state, action) => {},
//   [getCountsByParentIdThunk.pending]: (state, action) => {},
//   [getCountsByParentIdThunk.rejected]: (state, action) => {},

//   [addCountThunk.fulfilled]: (state, action) => {
//     state.isloading = false;
//     state.counts.push(action.payload.data);
//   },
//   [addCountThunk.pending]: (state, action) => {
//     state.isloading = true;
//   },
//   [addCountThunk.rejected]: (state, action) => {
//     state.isloading = false;
//     state.error = action.payload;
//   },

//   [deleteCountThunk.fulfilled]: (state, action) => {},
//   [deleteCountThunk.pending]: (state, action) => {},
//   [deleteCountThunk.rejected]: (state, action) => {},

//   [editCountThunk.fulfilled]: (state, { payload }) => {
//     state.isLoading = false;
//     const index = state.counts.findIndex(el => el._id === payload.data._id);

//     state.counts[index] = { ...payload.data };

//     console.log(index, state.counts[index].isArchived);
//   },
//   [editCountThunk.pending]: (state, action) => {},
//   [editCountThunk.rejected]: (state, action) => {},
// },
