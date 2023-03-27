import { createSlice } from '@reduxjs/toolkit';
import {
  getAllDocumentsThunk,
  getDocumentsByParentIdThunk,
  addDocumentThunk,
  deleteDocumentThunk,
  editDocumentThunk,
} from 'redux/documents/documents.thunks';

const initialState = {
  isLoading: false,
  error: null,
  documents: [],
};

export const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  extraReducers: {
    [getAllDocumentsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;

      state.documents = action.payload.data;
    },
    [getAllDocumentsThunk.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllDocumentsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [getDocumentsByParentIdThunk.fulfilled]: (state, action) => {},
    [getDocumentsByParentIdThunk.pending]: (state, action) => {},
    [getDocumentsByParentIdThunk.rejected]: (state, action) => {},

    [addDocumentThunk.fulfilled]: (state, action) => {
      state.isloading = false;
      state.documents.push(action.payload.data);
    },
    [addDocumentThunk.pending]: (state, action) => {
      state.isloading = true;
    },
    [addDocumentThunk.rejected]: (state, action) => {
      state.isloading = false;
      state.error = action.payload;
    },

    [deleteDocumentThunk.fulfilled]: (state, action) => {},
    [deleteDocumentThunk.pending]: (state, action) => {},
    [deleteDocumentThunk.rejected]: (state, action) => {},

    [editDocumentThunk.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      const index = state.documents.findIndex(el => el._id === payload.data._id);

      state.documents[index] = { ...payload.data };

      console.log(index, state.documents[index].isArchived);
    },
    [editDocumentThunk.pending]: (state, action) => {},
    [editDocumentThunk.rejected]: (state, action) => {},
  },
});

export const documentsReducer = documentsSlice.reducer;
