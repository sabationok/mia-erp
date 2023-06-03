import { createSlice } from '@reduxjs/toolkit';
import { IPermissionsState } from './permissions.types';
import * as _ from 'lodash';
import {
  createPermissionThunk,
  deletePermissionByIdThunk,
  editPermissionThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  logOutPermissionThunk,
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
      .addCase(getCurrentPermissionThunk.fulfilled, (state: IPermissionsState, action) => {
        state.permission = _.omit(action.payload, 'permissionToken');
        state.permissionToken = action.payload.permissionToken;
      })
      .addCase(getAllPermissionsByUserIdThunk.fulfilled, (state, action) => {})
      .addCase(getAllPermissionsByCompanyIdThunk.fulfilled, (state, action) => {})
      .addCase(createPermissionThunk.fulfilled, (state, action) => {})
      .addCase(editPermissionThunk.fulfilled, (state, action) => {})
      .addCase(deletePermissionByIdThunk.fulfilled, (state, action) => {})
      .addCase(logOutPermissionThunk.fulfilled, (state, action) => {
        state = initialPermissionStateState;
      })
      .addCase(clearCurrentPermission, (state, action) => {
        console.log('clearCurrentPermission', action);
        toast.success('Permission cleared');
        state.permission = {};
        state.permissionToken = '';
      }),
});
