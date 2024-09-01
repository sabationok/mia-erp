import { Action, createAction, isAnyOf } from '@reduxjs/toolkit';
import { PermissionEntity } from '../../types/permissions.types';
import { logOutPermissionThunk } from './permissions.thunk';

export const clearCurrentPermission = createAction('permissions/clearCurrent');
export const updatePermissionsWithNew = createAction<PermissionEntity>('permissions/updatePermissionsWithNew');
export const updatePermissionsWithDelete = createAction<{ id: string }>('permissions/updatePermissionsWithDelete');
export const setMockPermissionData = createAction<PermissionEntity>('permissions/setMockPermissionData');

export function onPermissionLogout(a: Action) {
  return isAnyOf(clearCurrentPermission, logOutPermissionThunk.fulfilled, logOutPermissionThunk.rejected)(a);
}
