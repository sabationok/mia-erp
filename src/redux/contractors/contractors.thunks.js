import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from 'api';
// import { token } from '../../services/baseApi';

export const getAllContractorsThunk = createAsyncThunk(
  'contractors/getAllContractorsThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await baseApi.get(`/directories/contractors/getAll`);

      payload?.onSuccess(response);

      return response.data;
    } catch (error) {
      console.log(error);

      payload?.onError(error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getContractorsByParentIdThunk = createAsyncThunk(
  'contractors/getContractorsByParentIdThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await baseApi.get(`/directories/contractors/getByOwnerId/${payload?.submitData._id}`);
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

export const addContractorThunk = createAsyncThunk('contractors/addContractorThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.post(`/directories/contractors/create`, payload?.submitData);
    console.log(response.data);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContractorThunk = createAsyncThunk(
  'contractors/deleteContractorThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await baseApi.delete(`/directories/contractors/delete/${payload?.submitData._id}`);
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

export const editContractorThunk = createAsyncThunk('contractors/editContractorThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.patch(
      `/directories/contractors/${payload?.submitData._id}`,
      payload?.submitData.updateData
    );

    payload?.onSuccess(response.data.data);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});
