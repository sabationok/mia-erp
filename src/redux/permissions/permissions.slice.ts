import { createSlice } from '@reduxjs/toolkit';
import { IPermissionsState } from './permissions.types';
import {
  createCompanyWithPermissionThunk,
  createPermissionThunk,
  deleteCompanyWithPermissionThunk,
  deletePermissionByIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  logInPermissionThunk,
  logOutPermissionThunk,
  updateCompanyWithPermissionThunk,
  updatePermissionThunk,
} from './permissions.thunk';

import { initialPermission, testPermissions } from '../../data/permissions.data';
import { clearCurrentPermission } from './permissions.action';
import { pages } from '../../data';

const initialPermissionStateState: IPermissionsState = {
  permission: {},
  permission_token: '',
  permissions: [] || testPermissions,
  isLoading: false,
  error: null,
};
export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: initialPermissionStateState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getCurrentPermissionThunk.fulfilled, (s: IPermissionsState, a) => {
        s.permission = {
          ...a.payload,
          role: { ...a.payload.role, accessKeys: Object.entries(pages).map(([path, page]) => page.path) },
        };
        s.permission_token = a.payload.permission_token;
      })
      .addCase(getAllPermissionsByUserIdThunk.fulfilled, (s, a) => {
        s.permissions = a.payload;
      })
      // .addCase(getAllPermissionsByCompanyIdThunk.fulfilled, (s, a) => {})
      .addCase(createPermissionThunk.fulfilled, (s, a) => {
        s.permissions = [a.payload, ...s.permissions];
      })
      .addCase(updatePermissionThunk.fulfilled, (s, a) => {})
      .addCase(deletePermissionByIdThunk.fulfilled, (s, a) => {
        if (a.payload.result) {
          s.permissions = s.permissions.filter(p => p._id !== a.payload?._id);
        }
      })
      .addCase(logInPermissionThunk.fulfilled, (s, a) => {
        s.permission = {
          ...a.payload,
          role: { ...a.payload.role, accessKeys: initialPermission.role?.accessKeys },
        };
        s.permission_token = a.payload.permission_token;
      })
      .addCase(logOutPermissionThunk.fulfilled, (s, a) => {
        s.permission = {};
        s.permission_token = '';
        s.error = null;
      })
      .addCase(clearCurrentPermission, (s, a) => {
        s.permission = {};
        s.permission_token = '';
      })
      .addCase(createCompanyWithPermissionThunk.fulfilled, (s, a) => {
        s.permissions = [a.payload, ...s.permissions];
      })
      .addCase(updateCompanyWithPermissionThunk.fulfilled, (s, a) => {})
      .addCase(deleteCompanyWithPermissionThunk.fulfilled, (s, a) => {}),
});
