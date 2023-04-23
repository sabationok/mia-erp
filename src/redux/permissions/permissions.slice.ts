import { createSlice } from '@reduxjs/toolkit';
import { IPermission, IPermissionsState } from './permissions.types';
import {
  createPermissionThunk,
  deletePermissionByIdThunk,
  editPermissionThunk,
  getAllPermissionsByCompanyIdThunk,
  getAllPermissionsByUserIdThunk,
  getCurrentPermissionThunk,
} from './permissions.thunk';
import { initialCompany } from '../companies/companies.slice';
import { ICustomRole } from '../../data/customRoles.types';
import { testUserKarina } from '../../data/usersDir.data';

export const iniialCustomRole: ICustomRole = {
  _id: 'dfbsdgbd',
  label: 'Фінансист',
  descr: 'Такоє собі посада',
  actions: [],
};
export const initialPermission: IPermission = {
  _id: 'sdfbsdfbdfg',
  status: 'active',
  permissionToken: 'permissionToken',
  company: initialCompany,
  user: testUserKarina,
  role: iniialCustomRole,
};
const initialPermState: IPermissionsState = {
  permission: initialPermission,
  permissions: [initialPermission],
  isLoading: false,
  error: null,
};
export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: initialPermState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllPermissionsByUserIdThunk.fulfilled, (state, action) => {
      })
      .addCase(getAllPermissionsByCompanyIdThunk.fulfilled, (state, action) => {
      })
      .addCase(createPermissionThunk.fulfilled, (state, action) => {
      })
      .addCase(editPermissionThunk.fulfilled, (state, action) => {
      })
      .addCase(deletePermissionByIdThunk.fulfilled, (state, action) => {
      })
      .addCase(getCurrentPermissionThunk.fulfilled, (state, action) => {
      }),
});