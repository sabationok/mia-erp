import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ICategory } from 'data/categories.types';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { axiosErrorCheck } from 'utils';

import baseApi from '../../api/baseApi';
// import { token } from '../../services/baseApi';

const CATEGORIES_API_BASENAME = '/directories/categories';
export const categoriesApiRoutes = {
  getAll: `${CATEGORIES_API_BASENAME}/getAll`,
  getById: `${CATEGORIES_API_BASENAME}/getById`,
  create: `${CATEGORIES_API_BASENAME}/create`,
  delete: `${CATEGORIES_API_BASENAME}/delete`,
  update: `${CATEGORIES_API_BASENAME}/update`,
};

export interface IAllCategories {
  data: ICategory[];
}

export interface IPayloadGetAllTr {
  submitData?: null;
  onSuccess: (data?: ICategory[]) => void;
  onError(error?: AuthErrorType): void;
}

export const getAllCategoriesThunk = createAsyncThunk<IAllCategories, IPayloadGetAllTr>(
  'categories/getAllCategoriesThunk',
  async (payload, thunkAPI) => {
    try {
      const response: AxiosResponse<IAllCategories> = await baseApi.get(categoriesApiRoutes.getAll);

      payload?.onSuccess(response.data.data);

      return response.data;
    } catch (error) {
      payload?.onError(error);

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
