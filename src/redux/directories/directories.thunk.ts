import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { AppResponse } from '../global.types';
import { AppQueryParams, DirectoriesApi } from '../../api';
import { ApiDirType } from '../APP_CONFIGS';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { GetAllByDirTypeOptions } from '../../api/directories.api';

export interface IAllDirectoryItemsRes extends AppResponse<IBaseDirItem[]> {}

export type GetAllDirectoryItemsThunkPayload<T = any> = ThunkPayload<
  { dirType?: ApiDirType; params?: Pick<AppQueryParams, 'isArchived' | 'createTreeData'> | undefined },
  { dirType?: ApiDirType; data: IBaseDirItem<T>[] }
>;
export const getAllDirectoryItemsThunk = createAsyncThunk<
  { dirType?: ApiDirType; data: IBaseDirItem[] },
  GetAllDirectoryItemsThunkPayload
>('directories/getAllDirectoryItemsThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await DirectoriesApi.getAllByDirType<IBaseDirItem>(data as GetAllByDirTypeOptions);

    if (response && onSuccess) {
      onSuccess({ dirType: data?.dirType, data: response.data.data });
    }

    return { dirType: data?.dirType, data: response.data.data };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
//
// export const createCategoryThunk = createAsyncThunk<IBaseDirItem, ThunkPayload<any, IBaseDirItem>>(
//   'categories/createCategoryThunk',
//   async ({ onSuccess, onError, data }, thunkAPI) => {
//     try {
//       const response = await DirectoriesApi.create<any, IBaseDirItem>({
//         dirType: ApiDirType.CATEGORIES_TR,
//         dto: data || {},
//       });
//
//       if (response && onSuccess) {
//         onSuccess(response.data.data);
//       }
//
//       return response.data.data;
//     } catch (error) {
//       onError && onError(error);
//
//       return thunkAPI.rejectWithValue(axiosErrorCheck(error));
//     }
//   }
// );
// export const deleteCategoryThunk = createAsyncThunk<
//   IBaseDirItem,
//   ThunkPayload<
//     {
//       _id: string;
//     },
//     Pick<IBaseDirItem, '_id' | 'label'> & { deletedChildrens?: number }
//   >
// >('categories/deleteCategoryThunk', async ({ onSuccess, onError, data }, thunkAPI) => {
//   try {
//     const response = await DirectoriesApi.delete<Pick<IBaseDirItem, '_id' | 'label'> & { deletedChildrens?: number }>({
//       dirType: ApiDirType.CATEGORIES_TR,
//       _id: data?._id as string,
//     });
//
//     if (response && onSuccess) {
//       onSuccess(response.data.data);
//     }
//
//     return response.data.data;
//   } catch (error) {
//     onError && onError(error);
//
//     return thunkAPI.rejectWithValue(axiosErrorCheck(error));
//   }
// });
//
// // export const addCategoryThunk = createAsyncThunk('categories/addCategoryThunk', async (payload, thunkAPI) => {
// //   try {
// //     const response = await baseApi.post(`/directories/categories/create`, payload?.submitData);
// //     console.log(response.data);
//
// //     payload?.onSuccess(response);
//
// //     return response.data;
// //   } catch (error) {
// //     console.log(error);
//
// //     payload?.onError(error);
//
// //     return thunkAPI.rejectWithValue(error.message);
// //   }
// // });
//
// // export const deleteCategoryThunk = createAsyncThunk('categories/deleteCategoryThunk', async (payload, thunkAPI) => {
// //   try {
// //     const response = await baseApi.delete(`/directories/categories/delete/${payload?.submitData.id}`);
// //     console.log(response.data);
//
// //     payload?.onSuccess(response);
//
// //     return response.data;
// //   } catch (error) {
// //     console.log(error);
//
// //     payload?.onError(error);
//
// //     return thunkAPI.rejectWithValue(error.message);
// //   }
// // });
//
// // export const editCategoryThunk = createAsyncThunk('categories/editCategoryThunk', async (payload, thunkAPI) => {
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
