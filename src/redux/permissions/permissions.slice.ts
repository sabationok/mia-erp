import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPermissionsState } from '../../types/permissions.types';
import {
  createCompanyWithPermissionThunk,
  createPermissionThunk,
  deleteCompanyWithPermissionThunk,
  deletePermissionByIdThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
  inviteUserThunk,
  logInPermissionThunk,
  logOutPermissionThunk,
  updateCurrentCompanyThunk,
  updatePermissionThunk,
} from './permissions.thunk';
import { initialPermission, testPermissions } from '../../data/permissions.data';
import { clearCurrentPermission, setMockPermissionData } from './permissions.action';
import { checks } from '../../utils';
import { StateErrorType } from '../reduxTypes.types';
import { getAllAccessKeys } from '../../components/AppPages';

const initialPermissionStateState: IPermissionsState = {
  permission: {},
  permission_token: '',
  permissions: [] || testPermissions,
  users: [],
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
          role: { ...a.payload.role, accessKeys: getAllAccessKeys() },
        };
        s.permission_token = a.payload.permission_token;
      })
      .addCase(setMockPermissionData, (s, a) => {
        s.permission = {
          ...a.payload,
          role: { ...a.payload.role, accessKeys: getAllAccessKeys() },
        };
        s.permission_token = a.payload.permission_token;
      })
      .addCase(getAllPermissionsByUserIdThunk.fulfilled, (s, a) => {
        s.permissions = a.payload;
      })
      .addCase(getAllPermissionsByCompanyIdThunk.fulfilled, (s, a) => {
        s.users = a.payload;
      })
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

      .addCase(inviteUserThunk.fulfilled, (s, a) => {
        s.users = [a.payload, ...s.permissions];
      })
      .addCase(updateCurrentCompanyThunk.fulfilled, (s, a) => {
        s.permission.company = a.payload;
      })
      .addCase(deleteCompanyWithPermissionThunk.fulfilled, (s, a) => {})
      .addMatcher(inPending, s => {
        s.isLoading = true;
        s.error = null;
      })
      .addMatcher(inFulfilled, s => {
        s.isLoading = false;
        s.error = null;
      })
      .addMatcher(inError, (s, a: PayloadAction<StateErrorType>) => {
        s.isLoading = false;
        s.error = a.payload;
      }),
});
function isPermissionsCase(type: string) {
  return checks.isStr(type) && type.startsWith('permissions');
}
function inPending(a: AnyAction) {
  return isPermissionsCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isPermissionsCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isPermissionsCase(a.type) && a.type.endsWith('rejected');
}
