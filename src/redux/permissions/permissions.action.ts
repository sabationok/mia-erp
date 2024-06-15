import { Action, createAction } from '@reduxjs/toolkit';
import { PermissionEntity } from '../../types/permissions.types';
import { logOutPermissionThunk } from './permissions.thunk';

export const clearCurrentPermission = createAction('permissions/clearCurrent');
export const updatePermissionsWithNew = createAction<PermissionEntity>('permissions/updatePermissionsWithNew');
export const updatePermissionsWithDelete = createAction<{ id: string }>('permissions/updatePermissionsWithDelete');
export const setMockPermissionData = createAction<PermissionEntity>('permissions/setMockPermissionData');

export function onPermissionLogout(a: Action) {
  return a.type === clearCurrentPermission.type || a.type === logOutPermissionThunk.fulfilled;
}
