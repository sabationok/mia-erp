import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, DirectoriesApi } from '../../api';
import { ApiDirType } from '../APP_CONFIGS';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { GetAllByDirTypeOptions } from '../../api/directories.api';

export interface DirThunkBaseSubmitData {
  dirType?: ApiDirType;
  params?: Partial<AppQueryParams>;
  refresh?: boolean;
}

export interface CreateDirItemThunkSubmitData<DTO = any> extends GetAllByDirTypeOptions {
  data: DTO;
}

export interface UpdateDirItemThunkSubmitData<DTO = any> extends GetAllByDirTypeOptions {
  _id: string;
  data: DTO;
}

export interface DirThunkBaseReturnData<T = any> {
  dirType?: ApiDirType;
  data: T;
}

export const getAllDirectoryItemsThunk = createAsyncThunk<
  DirThunkBaseReturnData<IBaseDirItem[]>,
  ThunkPayload<DirThunkBaseSubmitData, DirThunkBaseReturnData<IBaseDirItem[]>>
>('directories/getAllDirectoryItemsThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const res = await DirectoriesApi.getAllByDirType<IBaseDirItem>(data as GetAllByDirTypeOptions);

    if (res && onSuccess) {
      onSuccess({ dirType: data?.dirType, data: res.data.data });
    }

    return { dirType: data?.dirType, data: res.data.data };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const createDirectoryItemThunk = createAsyncThunk<
  DirThunkBaseReturnData<IBaseDirItem[]>,
  ThunkPayload<CreateDirItemThunkSubmitData<IBaseDirItem>, DirThunkBaseReturnData<IBaseDirItem[]>>
>('directories/createDirectoryItemThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const res = await DirectoriesApi.create(data as CreateDirItemThunkSubmitData);

    if (res && onSuccess) {
      onSuccess({ dirType: data?.dirType, data: res.data.data });
    }

    return { dirType: data?.dirType, data: res.data.data };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const updateDirectoryItemThunk = createAsyncThunk<
  DirThunkBaseReturnData<IBaseDirItem[]>,
  ThunkPayload<UpdateDirItemThunkSubmitData, DirThunkBaseReturnData<IBaseDirItem[]>>
>('directories/updateDirectoryItemThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const res = await DirectoriesApi.update<IBaseDirItem>(data as UpdateDirItemThunkSubmitData);

    if (res && onSuccess) {
      onSuccess({ dirType: data?.dirType, data: res.data.data });
    }

    return { dirType: data?.dirType, data: res.data.data };
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
//       const res = await DirectoriesApi.create<any, IBaseDirItem>({
//         dirType: ApiDirType.CATEGORIES_TR,
//         dto: data || {},
//       });
//
//       if (res && onSuccess) {
//         onSuccess(res.data.data);
//       }
//
//       return res.data.data;
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
//     const res = await DirectoriesApi.delete<Pick<IBaseDirItem, '_id' | 'label'> & { deletedChildrens?: number }>({
//       dirType: ApiDirType.CATEGORIES_TR,
//       _id: data?._id as string,
//     });
//
//     if (res && onSuccess) {
//       onSuccess(res.data.data);
//     }
//
//     return res.data.data;
//   } catch (error) {
//     onError && onError(error);
//
//     return thunkAPI.rejectWithValue(axiosErrorCheck(error));
//   }
// });
//
// // export const addCategoryThunk = createAsyncThunk('categories/addCategoryThunk', async (payload, thunkAPI) => {
// //   try {
// //     const res = await baseApi.post(`/directories/categories/create`, payload?.submitData);
// //     console.log(res.data);
//
// //     payload?.onSuccess(res);
//
// //     return res.data;
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
// //     const res = await baseApi.delete(`/directories/categories/delete/${payload?.submitData.id}`);
// //     console.log(res.data);
//
// //     payload?.onSuccess(res);
//
// //     return res.data;
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
//     const res = await baseApi.patch(
//       `/directories/categories/${payload?.submitData.id}`,
//       payload?.submitData.updateData
//     );

//     payload?.onSuccess(res);

//     return res.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });
