import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosErrorCheck } from 'utils';
import { ThunkPayload } from '../store.store';
import { AppQueryParams, DirectoriesApi } from '../../api';
import { ApiDirType } from '../APP_CONFIGS';
import { GetAllByDirTypeOptions } from '../../api/directories.api';
import { IDirItemBase } from '../../components/Directories/dir.types';

enum DirThunkTypePrefix {
  create = 'directories/createDirectoryItemThunk',
  update = 'directories/updateDirectoryItemThunk',
  delete = 'directories/deleteDirectoryItemThunk',
  getAllByDirType = 'directories/getAllDirectoryItemsByDirTypeThunk',
}
export interface DirThunkBaseSubmitData {
  dirType?: ApiDirType;
  params?: Partial<AppQueryParams>;
  refresh?: boolean;
}

export interface CreateDirItemThunkSubmitData<DTO = any> extends GetAllByDirTypeOptions {
  data: DTO;
  refresh?: boolean;
}

export interface UpdateDirItemThunkSubmitData<DTO = any> extends GetAllByDirTypeOptions {
  _id: string;
  data: DTO;
  refresh?: boolean;
  params?: AppQueryParams;
}

export interface DirThunkBaseReturnData<Data = any, Meta = any> {
  dirType?: ApiDirType;
  data: Data;
  meta?: Meta;
  refresh?: boolean;
}

export const getAllDirectoryItemsThunk = createAsyncThunk<
  DirThunkBaseReturnData<IDirItemBase[]>,
  ThunkPayload<DirThunkBaseSubmitData, DirThunkBaseReturnData<IDirItemBase[]>>
>(DirThunkTypePrefix.getAllByDirType, async ({ data, onSuccess, onError }, thunkAPI) => {
  try {
    const res = await DirectoriesApi.getAllByDirType<IDirItemBase>(data as GetAllByDirTypeOptions);

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
  DirThunkBaseReturnData<IDirItemBase[]>,
  ThunkPayload<CreateDirItemThunkSubmitData<IDirItemBase>, DirThunkBaseReturnData<IDirItemBase[]>>
>(DirThunkTypePrefix.create, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    if (!data?.dirType) {
      throw new Error('Not dir type passed to thunk');
    }

    const res = await DirectoriesApi.create(data as CreateDirItemThunkSubmitData);

    if (res && onSuccess) {
      onSuccess({ dirType: data?.dirType, data: res.data.data });
    }
    onLoading && onLoading(false);
    return { dirType: data?.dirType, data: res.data.data, refresh: data?.refresh };
  } catch (error) {
    onError && onError(error);
    onLoading && onLoading(false);
    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const deleteDirectoryItemThunk = createAsyncThunk<
  DirThunkBaseReturnData<IDirItemBase[]>,
  ThunkPayload<UpdateDirItemThunkSubmitData, DirThunkBaseReturnData<IDirItemBase[]>>
>(DirThunkTypePrefix.delete, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    if (!data?.dirType) {
      throw new Error('Not dir type passed to thunk');
    }
    const res = await DirectoriesApi.update<IDirItemBase>(data as UpdateDirItemThunkSubmitData);

    if (res && onSuccess) {
      onSuccess({ dirType: data?.dirType, data: res.data.data });
    }
    onLoading && onLoading(false);

    return { dirType: data?.dirType, data: res.data.data, refresh: data?.refresh };
  } catch (error) {
    onError && onError(error);
    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});

export const updateDirectoryItemThunk = createAsyncThunk<
  DirThunkBaseReturnData<IDirItemBase[]>,
  ThunkPayload<UpdateDirItemThunkSubmitData, DirThunkBaseReturnData<IDirItemBase[]>>
>(DirThunkTypePrefix.update, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    if (!data?.dirType) {
      throw new Error('Not dir type passed to thunk');
    }
    const res = await DirectoriesApi.update<IDirItemBase>(data as UpdateDirItemThunkSubmitData);

    if (res && onSuccess) {
      onSuccess({ dirType: data?.dirType, data: res.data.data });
    }
    onLoading && onLoading(false);

    return { dirType: data?.dirType, data: res.data.data, refresh: data?.refresh };
  } catch (error) {
    onError && onError(error);
    onLoading && onLoading(false);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  }
});
