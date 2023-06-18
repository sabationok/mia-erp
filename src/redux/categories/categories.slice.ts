import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from 'redux/categories/categories.types';

import { createCategoryThunk, deleteCategoryThunk, getAllCategoriesThunk } from 'redux/categories/categories.thunk';
import { AuthErrorType } from 'redux/reduxTypes.types';

export interface ICategoriesState {
  isLoading: boolean;
  error: AuthErrorType;
  categories: ICategory[];
}

const initialState: ICategoriesState = {
  isLoading: false,
  error: null,
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllCategoriesThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.categories = a.payload;
      })
      .addCase(deleteCategoryThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.categories = s.categories.filter(el => el._id !== a.payload._id || el.parent?._id === a.payload._id);
      })
      .addCase(createCategoryThunk.fulfilled, (s, a) => {
        s.isLoading = false;
        s.categories = [a.payload, ...s.categories];
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

export const categoriesReducer = categoriesSlice.reducer;

// const extraReducers = {
//   [getAllCategoriesThunk.fulfilled]: (s, a) => {
//     s.isLoading = false;

//     s.categories = a.payload.data;
//   },
//   [getAllCategoriesThunk.pending]: (s, a) => {
//     s.isLoading = true;
//   },
//   [getAllCategoriesThunk.rejected]: (s, a) => {
//     s.isLoading = false;
//     s.error = a.payload;
//   },

//   [getCategoriesByParentIdThunk.fulfilled]: (s, a) => {},
//   [getCategoriesByParentIdThunk.pending]: (s, a) => {},
//   [getCategoriesByParentIdThunk.rejected]: (s, a) => {},

//   [addCategoryThunk.fulfilled]: (s, a) => {
//     s.isloading = false;
//     s.categories.push(a.payload.data);
//   },
//   [addCategoryThunk.pending]: (s, a) => {
//     s.isloading = true;
//   },
//   [addCategoryThunk.rejected]: (s, a) => {
//     s.isloading = false;
//     s.error = a.payload;
//   },

//   [deleteCategoryThunk.fulfilled]: (s, a) => {},
//   [deleteCategoryThunk.pending]: (s, a) => {},
//   [deleteCategoryThunk.rejected]: (s, a) => {},

//   [editCategoryThunk.fulfilled]: (s, { payload }) => {
//     s.isLoading = false;
//     const index = s.categories.findIndex(el => el._id === payload.data._id);

//     s.categories[index] = { ...payload.data };

//     console.log(index, s.categories[index].isArchived);
//   },
//   [editCategoryThunk.pending]: (s, a) => {},
//   [editCategoryThunk.rejected]: (s, a) => {},
// };
