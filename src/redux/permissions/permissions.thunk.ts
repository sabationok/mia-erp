import { CompaniesApi, PermissionsApi } from '../../api';
import { buildUpdateCompanyThunk } from '../companies/companies.thunks';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum PermissionsThunkType {
  getAllPermissionsByUserId = 'permissions/getAllPermissionsByUserIdThunk',
  getAllPermissionsByCompanyId = 'permissions/getAllPermissionsByCompanyIdThunk',
  login = 'permissions/logInPermissionThunk',
  logOut = 'permissions/logOutPermissionThunk',
  getCurrent = 'permissions/getCurrentPermissionThunk',
  create = 'permissions/createPermissionThunk',
  update = 'permissions/updatePermissionThunk',
  deletePermissionById = 'permissions/deletePermissionByIdThunk',
  inviteUser = 'permissions/inviteUserThunk',
  createCompanyWithPermission = 'permissions/createCompanyWithPermissionThunk',
  deleteCompanyWithPermission = 'permissions/deleteCompanyWithPermissionThunk',
  updateCurrentCompanyThunk = 'permissions/updateCurrentCompanyThunk',
  setCurrentCompanyConfigs = 'permissions/setCurrentCompanyConfigsThunk',
  getCurrentCompanyConfigs = 'permissions/getCurrentCompanyConfigsThunk',
}

export const getAllPermissionsByUserIdThunk = createAppAsyncThunk(
  PermissionsThunkType.getAllPermissionsByUserId,
  PermissionsApi.getAllByUserId
);

export const getAllPermissionsByCompanyIdThunk = createAppAsyncThunk(
  PermissionsThunkType.getAllPermissionsByCompanyId,
  PermissionsApi.getAllByCompanyId
);

export const getCurrentPermissionThunk = createAppAsyncThunk(
  PermissionsThunkType.getCurrent,
  PermissionsApi.getCurrent
);
export const logInPermissionThunk = createAppAsyncThunk(PermissionsThunkType.login, PermissionsApi.logIn);
export const logOutPermissionThunk = createAppAsyncThunk(PermissionsThunkType.logOut, PermissionsApi.logOut);
export const createPermissionThunk = createAppAsyncThunk(PermissionsThunkType.create, PermissionsApi.create);
export const inviteUserThunk = createAppAsyncThunk(PermissionsThunkType.inviteUser, PermissionsApi.inviteUser);
export const createCompanyWithPermissionThunk = createAppAsyncThunk(
  PermissionsThunkType.createCompanyWithPermission,
  CompaniesApi.create
);

export const deleteCompanyWithPermissionThunk = createAppAsyncThunk(
  PermissionsThunkType.deleteCompanyWithPermission,
  CompaniesApi.delete
);
export const updatePermissionThunk = createAppAsyncThunk(PermissionsThunkType.update, PermissionsApi.updateById);

export const deletePermissionByIdThunk = createAppAsyncThunk(
  PermissionsThunkType.deletePermissionById,
  PermissionsApi.deleteById
);

export const updateCurrentCompanyThunk = buildUpdateCompanyThunk(PermissionsThunkType.updateCurrentCompanyThunk);
