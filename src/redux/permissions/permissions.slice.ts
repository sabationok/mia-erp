import { createSlice } from '@reduxjs/toolkit';
import { IPermission, IPermissionsState } from './permissions.types';
import { getAllPermissionsThunk, getCurrentPermissionThunk } from './permissions.thunk';


export const initialPermission: IPermission = {
  _id: 'sdfbsdfbdfg',
  status: 'active',
  permissionToken: 'permissionToken',
  company: {},
  user: {},
  role: {
    _id: 'dfbsdgbd',
    label: 'Фінансист',
    descr: 'Такоє собі посада',
    actions: [],
  },
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
      .addCase(getAllPermissionsThunk.fulfilled, (state, action) => {
      })
      .addCase(getCurrentPermissionThunk.fulfilled, (state, action) => {
      }),
});