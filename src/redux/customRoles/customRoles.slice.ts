import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAllActionsThunk, getAllRolesThunk } from './customRoles.thunks';
import { StateErrorType } from 'redux/reduxTypes.types';
import { rolesMockData } from 'data/customRoles.data';
import { ICustomRole, ModuleWithActions } from 'redux/customRoles/customRoles.types';
import { checks, sliceCleaner } from '../../utils';
import { onUserLogout } from '../auth/auth.actions';

export interface ICustomRolesState {
  customRoles: ICustomRole[];
  isLoading: boolean;
  modules: ModuleWithActions[];
  error: StateErrorType;
}

const initialState: ICustomRolesState = {
  isLoading: false,
  modules: [],
  error: null,
  customRoles: [...rolesMockData],
};

export const customRolesSlice = createSlice({
  name: 'customRoles',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllRolesThunk.fulfilled, (state, action) => {
        state.customRoles = action.payload.data;
      })
      .addCase(getAllActionsThunk.fulfilled, (state, action) => {
        state.modules = action?.payload?.data;
      })
      .addMatcher(inPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(inFulfilled, (state, action: PayloadAction<StateErrorType>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(inError, (state, action: PayloadAction<StateErrorType>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addMatcher(onUserLogout, sliceCleaner(initialState)),
});

export function isCustomRolesCase(type: string) {
  return checks.isStr(type) && type.startsWith('users');
}
function inPending(a: AnyAction) {
  return isCustomRolesCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isCustomRolesCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isCustomRolesCase(a.type) && a.type.endsWith('rejected');
}
