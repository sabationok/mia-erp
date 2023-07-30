import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { ApiDirType } from '../APP_CONFIGS';
import { createDirectoryItemThunk, getAllDirectoryItemsThunk } from './directories.thunk';
import { IBaseDirItem } from '../../components/Directories/dir.types';
import { DefaultDirectoryType } from './directories.types';

export interface IDirectoriesState extends Record<string, any> {
  defaultDirectories?: Record<string, DefaultDirectoryType[]>;
  directories: Record<ApiDirType | string, IBaseDirItem[]>;
  error: AuthErrorType;
  isLoading: boolean;
}

const initialState: IDirectoriesState = {
  isLoading: false,
  error: null,
  directories: {
    [ApiDirType.CATEGORIES_TR]: [],
    [ApiDirType.COUNTS]: [],
    [ApiDirType.ACTIVITIES]: [],
    [ApiDirType.CONTRACTORS]: [],
    [ApiDirType.PROJECTS]: [],
    [ApiDirType.WORKERS]: [],
    [ApiDirType.WAREHOUSES]: [],
    [ApiDirType.TAGS]: [],
    [ApiDirType.METHODS_SHIPMENT]: [],
    [ApiDirType.METHODS_PAYMENT]: [],
    [ApiDirType.METHODS_COMMUNICATION]: [],
    [ApiDirType.STATUSES_SHIPMENT]: [],
    [ApiDirType.STATUSES_ORDER]: [],
    [ApiDirType.STATUSES_REFUND]: [],
    [ApiDirType.STATUSES_PAYMENT]: [],
  },
};

export const directoriesSlice = createSlice({
  name: 'directories',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllDirectoryItemsThunk.fulfilled, (s, a) => {
        s.isLoading = false;

        if (a.payload?.dirType) {
          s.directories[a.payload?.dirType] = a.payload.data;
        }
      })
      // .addCase(deleteDirectoryItemThunk.fulfilled, (s, a) => {
      //   s.isLoading = false;
      //   s[a.payload.dirType] = s[a.payload.dirType].filter(
      //     el => el._id !== a.payload._id || el.parent?._id === a.payload._id
      //   );
      // })
      .addCase(createDirectoryItemThunk.fulfilled, (s, a) => {
        s.isLoading = false;

        if (a.payload?.dirType) {
          s.directories[a.payload?.dirType] = a.payload.data;
        }
      })
      .addMatcher(inPending, s => {
        s.isLoading = true;
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

function inError(a: AnyAction) {
  return a.type.endsWith('rejected');
}

export const directoriesReducer = directoriesSlice.reducer;

// const extraReducers = {
//   [getAllDirectorItemThunk.fulfilled]: (s, a) => {
//     s.isLoading = false;

//     s.categories = a.payload.data;
//   },
//   [getAllDirectorItemThunk.pending]: (s, a) => {
//     s.isLoading = true;
//   },
//   [getAllDirectorItemThunk.rejected]: (s, a) => {
//     s.isLoading = false;
//     s.error = a.payload;
//   },

//   [getDirectoriesByParentIdThunk.fulfilled]: (s, a) => {},
//   [getDirectoriesByParentIdThunk.pending]: (s, a) => {},
//   [getDirectoriesByParentIdThunk.rejected]: (s, a) => {},

//   [addDirectoryItemThunk.fulfilled]: (s, a) => {
//     s.isloading = false;
//     s.categories.push(a.payload.data);
//   },
//   [addDirectoryItemThunk.pending]: (s, a) => {
//     s.isloading = true;
//   },
//   [addDirectoryItemThunk.rejected]: (s, a) => {
//     s.isloading = false;
//     s.error = a.payload;
//   },

//   [deleteDirectoryItemThunk.fulfilled]: (s, a) => {},
//   [deleteDirectoryItemThunk.pending]: (s, a) => {},
//   [deleteDirectoryItemThunk.rejected]: (s, a) => {},

//   [editDirectoryItemThunk.fulfilled]: (s, { payload }) => {
//     s.isLoading = false;
//     const index = s.categories.findIndex(el => el._id === payload.data._id);

//     s.categories[index] = { ...payload.data };

//     console.log(index, s.categories[index].isArchived);
//   },
//   [editDirectoryItemThunk.pending]: (s, a) => {},
//   [editDirectoryItemThunk.rejected]: (s, a) => {},
// };
