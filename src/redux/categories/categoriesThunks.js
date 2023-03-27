import { createAsyncThunk } from '@reduxjs/toolkit';

import baseApi from '../../api/baseApi';
// import { token } from '../../services/baseApi';

export const getAllCategoriesThunk = createAsyncThunk('categories/getAllCategoriesThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.get(`/directories/categories/getAll`);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const getCategoriesByParentIdThunk = createAsyncThunk(
  'categories/getCategoriesByParentIdThunk',
  async (payload, thunkAPI) => {
    try {
      const response = await baseApi.get(`/directories/categories/getByOwnerId/${payload?.submitData.id}`);
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

export const addCategoryThunk = createAsyncThunk('categories/addCategoryThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.post(`/directories/categories/create`, payload?.submitData);
    console.log(response.data);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteCategoryThunk = createAsyncThunk('categories/deleteCategoryThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.delete(`/directories/categories/delete/${payload?.submitData.id}`);
    console.log(response.data);

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editCategoryThunk = createAsyncThunk('categories/editCategoryThunk', async (payload, thunkAPI) => {
  try {
    const response = await baseApi.patch(
      `/directories/categories/${payload?.submitData.id}`,
      payload?.submitData.updateData
    );

    payload?.onSuccess(response);

    return response.data;
  } catch (error) {
    console.log(error);

    payload?.onError(error);

    return thunkAPI.rejectWithValue(error.message);
  }
});
