import { createAsyncThunk } from '@reduxjs/toolkit';

import baseApi from '../../api/baseApi';
// import { token } from '../../services/baseApi';

export const getAllDocumentsThunk = createAsyncThunk('documents/getAllDocumentsThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.get(`/documents/getAll`);

    payload?.onSuccess();

    return response.data;
  } catch (error) {
    // console.log(error);

    payload?.onError();

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getDocumentsByParentIdThunk = createAsyncThunk(
  'documents/getDocumentsByParentIdThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await baseApi.get(`/documents/getByOwnerId/${payload.submitData.id}`);
      console.log(response.data);

      payload.onSuccess();

      return response.data;
    } catch (error) {
      // console.log(error);

      payload.onError();

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addDocumentThunk = createAsyncThunk('documents/addDocumentThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.post(`/documents/create`, payload.submitData);
    console.log(response.data);

    payload.onSuccess();

    return response.data;
  } catch (error) {
    // console.log(error);

    payload.onError();

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteDocumentThunk = createAsyncThunk('documents/deleteDocumentThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.delete(`/documents/${payload.submitData.id}`);
    console.log(response.data);

    payload.onSuccess();

    return response.data;
  } catch (error) {
    console.log(error);

    payload.onError();

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editDocumentThunk = createAsyncThunk('documents/editDocumentThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.patch(`/documents/${payload.submitData.id}`, payload.submitData.updateData);

    payload.onSuccess(response.data.data);

    return response.data;
  } catch (error) {
    console.log(error);

    payload.onError();

    return thunkAPI.rejectWithValue(error.message);
  }
});
