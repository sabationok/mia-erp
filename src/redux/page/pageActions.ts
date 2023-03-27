import { createAction } from '@reduxjs/toolkit';
import { IPage, ISearchParams } from './pageSlice';

export const actionSetPage = createAction<IPage>('appPage/actionSetPage');
export const actionResetPageSettings = createAction('appPage/actionResetPageSettings');
export const actionSetIndexPage = createAction<string>('appPage/actionSetIndexPage');
export const actionSetSearchParams = createAction<ISearchParams>('appPage/actionSetSearchParams');
export const actionSetPageGrid = createAction<string>('appPage/actionSetPageGrid');
export const actionSetPageGridChange = createAction<boolean | undefined>('appPage/actionSetPageGridChange');
export const actionSetMobile = createAction<boolean>('appPage/actionSetDevice');
export const actionSetPageObjData = createAction<any>('appPage/actionSetPageObjData');
