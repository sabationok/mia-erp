import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory } from 'redux/categories/categories.types';
import { axiosErrorCheck } from 'utils';

import baseApi from '../../api/baseApi';
import { ThunkPayload } from '../store.store';
import { AppResponse } from '../global.types';
// import { token } from '../../services/baseApi';

const CATEGORIES_API_BASENAME = '/directories/categories';
export const categoriesApiRoutes = {
  getAll: `${CATEGORIES_API_BASENAME}/getAll`,
  getById: `${CATEGORIES_API_BASENAME}/getById`,
  create: `${CATEGORIES_API_BASENAME}/create`,
  delete: `${CATEGORIES_API_BASENAME}/delete`,
  update: `${CATEGORIES_API_BASENAME}/update`,
};

export interface IAllCategoriesRes extends AppResponse<ICategory[]> {}

export const getAllCategoriesThunk = createAsyncThunk<ICategory[], ThunkPayload>(
  'categories/getAllCategoriesThunk',
  async ({ onSuccess, onError }, thunkAPI) => {
    try {
      const response: IAllCategoriesRes = await baseApi.get(categoriesApiRoutes.getAll);

      response && onSuccess && onSuccess(response.data.data);

      return response.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    }
  }
);

// export const addCategoryThunk = createAsyncThunk('categories/addCategoryThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.post(`/directories/categories/create`, payload?.submitData);
//     console.log(response.data);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const deleteCategoryThunk = createAsyncThunk('categories/deleteCategoryThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.delete(`/directories/categories/delete/${payload?.submitData.id}`);
//     console.log(response.data);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const editCategoryThunk = createAsyncThunk('categories/editCategoryThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.patch(
//       `/directories/categories/${payload?.submitData.id}`,
//       payload?.submitData.updateData
//     );

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
