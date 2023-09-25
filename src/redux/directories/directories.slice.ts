import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { ApiDirType } from '../APP_CONFIGS';
import {
  createDirectoryItemThunk,
  deleteDirectoryItemThunk,
  getAllDirectoryItemsThunk,
  updateDirectoryItemThunk,
} from './directories.thunk';
import { IDirItemBase } from '../../components/Directories/dir.types';
import { DefaultDirectoryType } from './directories.types';
import { enumToArray } from '../../utils';

export interface IDirectoriesState extends Record<string, any> {
  defaultDirectories?: Record<string, DefaultDirectoryType[]>;
  directories: Record<ApiDirType | string, IDirItemBase[]>;
  error: AuthErrorType;
  isLoading: boolean;
}

const createInitialDirMap = () => {
  let directories: Record<ApiDirType | string, IDirItemBase[]> = {};

  enumToArray(ApiDirType).map(type => {
    directories[type] = [];
    return '';
  });

  return directories;
};

const initialState: IDirectoriesState = {
  isLoading: false,
  error: null,
  directories: createInitialDirMap(),
};

export const directoriesSlice = createSlice({
  name: 'directories',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllDirectoryItemsThunk.fulfilled, (s, a) => {
        if (a.payload?.dirType) {
          s.directories[a.payload?.dirType] = a.payload.data;
        }
      })
      .addCase(deleteDirectoryItemThunk.fulfilled, (s, a) => {
        if (a.payload?.dirType) {
          s.directories[a.payload?.dirType] = a.payload.data;
        }
      })
      .addCase(createDirectoryItemThunk.fulfilled, (s, a) => {
        if (a.payload?.dirType) {
          s.directories[a.payload?.dirType] = a.payload.data;
        }
      })
      .addCase(updateDirectoryItemThunk.fulfilled, (s, a) => {
        if (a.payload?.dirType) {
          s.directories[a.payload?.dirType] = a.payload.data;
        }
      })
      .addMatcher(inPending, s => {
        s.isLoading = true;
        s.error = null;
      })
      .addMatcher(inFulfilled, s => {
        s.isLoading = false;
        s.error = null;
      })
      .addMatcher(inError, (s, a: PayloadAction<AuthErrorType>) => {
        s.isLoading = false;
        s.error = a.payload;
      }),
});

function inPending(a: AnyAction) {
  return a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return a.type.endsWith('rejected');
}

export const directoriesReducer = directoriesSlice.reducer;
