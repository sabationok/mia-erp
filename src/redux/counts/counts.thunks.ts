import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { AppResponse } from '../global.types';
import { AppQueryParams, DirectoriesApi } from '../../api';
import { ApiDirType } from '../APP_CONFIGS';
import { ICount, ICountFormData } from './counts.types';

export interface IAllCountsRes extends AppResponse<ICount[]> {}

export const getAllCountsThunk = createAsyncThunk<
  ICount[],
  ThunkPayload<Pick<AppQueryParams, 'isArchived' | 'createTreeData'> | undefined, ICount[]>
>('counts/getAllCountsThunk', async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const response = await DirectoriesApi.getAllByDirType<ICount>({
      dirType: ApiDirType.COUNTS,
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

export const createCountThunk = createAsyncThunk<ICount, ThunkPayload<ICountFormData, ICount>>(
  'counts/createCountThunk',
  async ({ onSuccess, onError, data }, thunkAPI) => {
    try {
      const response = await DirectoriesApi.create<ICountFormData, ICount>({
        dirType: ApiDirType.COUNTS,
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
export const deleteCountThunk = createAsyncThunk<
  ICount,
  ThunkPayload<
    {
      _id: string;
    },
    Pick<ICount, '_id' | 'label'> & { deletedChildrens?: number }
  >
>('counts/deleteCountThunk', async ({ onSuccess, onError, data }, thunkAPI) => {
  try {
    const response = await DirectoriesApi.delete<Pick<ICount, '_id' | 'label'> & { deletedChildrens?: number }>({
      dirType: ApiDirType.COUNTS,
      _id: data?._id as string,
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

// export const addCountThunk = createAsyncThunk('counts/addCountThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.post(`/directories/counts/create`, payload?.submitData);
//     console.log(response.data);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const deleteCountThunk = createAsyncThunk('counts/deleteCountThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.delete(`/directories/counts/delete/${payload?.submitData.id}`);
//     console.log(response.data);

//     payload?.onSuccess(response);

//     return response.data;
//   } catch (error) {
//     console.log(error);

//     payload?.onError(error);

//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

// export const editCountThunk = createAsyncThunk('counts/editCountThunk', async (payload, thunkAPI) => {
//   try {
//     const response = await baseApi.patch(
//       `/directories/counts/${payload?.submitData.id}`,
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
