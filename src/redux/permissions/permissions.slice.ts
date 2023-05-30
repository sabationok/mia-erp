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
import { ICustomRole } from '../customRoles/customRoles.types';
import { testUserKarina } from '../../data/usersDir.data';

export const initialCustomRole: ICustomRole = {
  _id: 'dfbsdgbd',
  label: 'Фінансист',
  descr: 'Такоє собі посада',
  actions: [],
  accessKeys: ['companies', 'transactions', 'orders', 'refunds', 'supplement', 'storage', 'manager', 'admin'],
};
export const initialPermission: IPermission = {
  _id: 'companyId',
  status: 'active',
  permissionToken: 'permissionToken',
  company: initialCompany,
  user: testUserKarina,
  role: initialCustomRole,
};
const testPermissions = [
  initialPermission,
  {
    ...initialPermission,
    _id: 'dfbscfbvfgnbd13f5g13bdg1',
    company: { ...initialCompany, _id: 'dfbscxvfgnbd13f5g13bdg1', name: 'Roga & Copyta' },
    role: { ...initialPermission.role, label: 'Менеджер' },
  },
  {
    ...initialPermission,
    _id: 'dfbscxvcxgnbd13f5g13bdg1',
    company: { ...initialCompany, _id: 'dfbsdfsdf13f5g13bdg1', name: 'Roga & Copyta 3' },
    role: { ...initialPermission.role, label: 'Помічник' },
  },
  {
    ...initialPermission,
    _id: 'dfbscxvsdfbvsd13f5g13bdg1',
    company: { ...initialCompany, _id: 'dfbsxcvgbd13f5g13bdg1', name: 'Roga & Copyta 4' },
    role: { ...initialPermission.role, label: 'Аудитор' },
  },
];
const initialPermState: IPermissionsState = {
  permission: initialPermission,
  permissions: testPermissions,
  isLoading: false,
  error: null,
};
export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: initialPermState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getAllPermissionsByUserIdThunk.fulfilled, (state, action) => {})
      .addCase(getAllPermissionsByCompanyIdThunk.fulfilled, (state, action) => {})
      .addCase(createPermissionThunk.fulfilled, (state, action) => {})
      .addCase(editPermissionThunk.fulfilled, (state, action) => {})
      .addCase(deletePermissionByIdThunk.fulfilled, (state, action) => {})
      .addCase(getCurrentPermissionThunk.fulfilled, (state, action) => {}),
});
