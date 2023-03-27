import { createAsyncThunk } from '@reduxjs/toolkit';

import baseApi from '../../api/baseApi';
// import { token } from '../../services/baseApi';

export const getAllCountsThunk = createAsyncThunk('counts/getAllCountsThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.get(`/directories/counts/getAll`);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCountsByParentIdThunk = createAsyncThunk(
  'counts/getCountsByParentIdThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await baseApi.get(`/directories/counts/getByOwnerId/${payload.submitData.id}`);
      console.log(response.data);

      payload?.onSuccess(response);

      return response.data;
    } catch (error) {
      console.log(error);

      payload?.onError(error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCountThunk = createAsyncThunk('counts/addCountThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.post(`/directories/counts/create`, payload.submitData);
    console.log(response.data);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    // console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteCountThunk = createAsyncThunk('counts/deleteCountThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.delete(`/directories/counts/${payload.submitData.id}`);
    console.log(response.data);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editCountThunk = createAsyncThunk('counts/editCountThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.patch(`/directories/counts/${payload.submitData.id}`, payload.submitData.updateData);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});
