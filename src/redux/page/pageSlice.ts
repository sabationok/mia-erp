import { createSlice } from '@reduxjs/toolkit';

import {
  actionSetPage,
  actionSetMobile,
  actionSetIndexPage,
  actionSetPageGrid,
  actionSetSearchParams,
  actionSetPageGridChange,
  actionResetPageSettings,
  actionSetPageObjData,
} from './pageActions';

export interface IPage {
  title?: string;
  parentPath?: string;
  path?: string;
  iconId?: string;
}
export interface ISearchParams {
  product: string | null;
  order: string | null;
  refund: string | null;
}
export interface IPageInitialState {
  page: IPage;
  indexPage: string;
  pageObjData: any; // !!!!
  searchParams: ISearchParams;
  pageGridChangeble: boolean | undefined;
  pageGrid: string;
  isMobile: boolean;
}
const pageState: IPage = {
  title: '',
  parentPath: '',
  path: '',
  iconId: '',
};
const searchParams: ISearchParams = {
  product: null,
  order: null,
  refund: null,
};

const initialState: IPageInitialState = {
  page: pageState,
  indexPage: 'orders',
  pageObjData: null, // !!!!
  searchParams: searchParams,
  pageGridChangeble: false,
  pageGrid: 'gridFirst',
  isMobile: false,
};

export const appPageSlice = createSlice({
  name: 'appPage',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(actionSetPage, (state, action) => {
        state.page = action.payload;
      })
      .addCase(actionResetPageSettings, (state, _action) => {
        state = initialState;
        console.log(state);
      })
      .addCase(actionSetMobile, (state, action) => {
        state.isMobile = action.payload;
      })
      .addCase(actionSetIndexPage, (state, action) => {
        state.indexPage = action.payload;
      })
      .addCase(actionSetSearchParams, (state, action) => {
        state.searchParams = { ...state.searchParams, ...action.payload };
      })
      .addCase(actionSetPageGrid, (state, action) => {
        state.pageGrid = action.payload;
      })
      .addCase(actionSetPageGridChange, (state, action) => {
        state.pageGridChangeble = action.payload || !state.pageGridChangeble;
      })
      .addCase(actionSetPageObjData, (state, action) => {
        state.pageObjData = action.payload;
      }),
});

export const appPageReducer = appPageSlice.reducer;
