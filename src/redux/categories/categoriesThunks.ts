import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICategory, ICategoryFormData } from 'redux/categories/categories.types';
import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { AppResponse } from '../global.types';
import { AppQueryParams, DirectoriesApi } from '../../api';
import { ApiDirType } from '../APP_CONFIGS';

// import { token } from '../../services/baseApi';

export interface IAllCategoriesRes extends AppResponse<ICategory[]> {}

export const getAllCategoriesThunk = createAsyncThunk<
  ICategory[],
  ThunkPayload<Pick<AppQueryParams, 'isArchived' | 'createTreeData'> | undefined>
>('categories/getAllCategoriesThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await DirectoriesApi.getAllByDirType<ICategory>({
      dirType: ApiDirType.CATEGORIES_TR,
      params: data,
    });

    if (response && onSuccess) {
      onSuccess(response.data.data);
    }

    return response.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const createCategoryThunk = createAsyncThunk<ICategory, ThunkPayload<ICategoryFormData>>(
  'categories/createCategoryThunk',
  async ({ onSuccess, onError, data }, thunkAPI) => {
    try {
      const response = await DirectoriesApi.create<ICategoryFormData, ICategory>({
        dirType: ApiDirType.CATEGORIES_TR,
        dto: data || {},
      });

      if (response && onSuccess) {
        onSuccess(response.data.data);
      }

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
