import { createSlice } from '@reduxjs/toolkit';
import { IPermissionsState } from './permissions.types';
import * as _ from 'lodash';
import {
  createCompanyWithPermissionThunk,
  createPermissionThunk,
  deleteCompanyWithPermissionThunk,
  deletePermissionByIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  logOutPermissionThunk,
  updateCompanyWithPermissionThunk,
  updatePermissionThunk,
} from './permissions.thunk';

import { testPermissions } from '../../data/permissions.data';
import { clearCurrentPermission } from './permissions.action';
import { toast } from 'react-toastify';

const initialPermissionStateState: IPermissionsState = {
  permission: {},
  permissionToken: '',
  permissions: testPermissions,
  isLoading: false,
  error: null,
};
export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: initialPermissionStateState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getCurrentPermissionThunk.fulfilled, (state: IPermissionsState, a) => {
        state.permission = _.omit(a.payload, 'permissionToken');
        state.permissionToken = a.payload.permissionToken;
      })
      .addCase(getAllPermissionsByUserIdThunk.fulfilled, (s, a) => {})
      // .addCase(getAllPermissionsByCompanyIdThunk.fulfilled, (s, a) => {})
      .addCase(createPermissionThunk.fulfilled, (s, a) => {})
      .addCase(updatePermissionThunk.fulfilled, (s, a) => {})
      .addCase(deletePermissionByIdThunk.fulfilled, (s, a) => {})
      .addCase(logOutPermissionThunk.fulfilled, (s, a) => {
        s = initialPermissionStateState;
      })
      .addCase(clearCurrentPermission, (s, a) => {
        console.log('clearCurrentPermission', a);
        toast.success('Permission cleared');
        s.permission = {};
        s.permissionToken = '';
      })
      .addCase(createCompanyWithPermissionThunk.fulfilled, (s, a) => {
        s.permissions = [a.payload, ...s.permissions];
      })
      .addCase(updateCompanyWithPermissionThunk.fulfilled, (s, a) => {})
      .addCase(deleteCompanyWithPermissionThunk.fulfilled, (s, a) => {}),
});
