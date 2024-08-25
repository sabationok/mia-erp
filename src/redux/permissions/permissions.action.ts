import { Action, createAction } from '@reduxjs/toolkit';
import { PermissionEntity } from '../../types/permissions.types';
import { logOutPermissionThunk } from './permissions.thunk';

export const clearCurrentPermission = createAction('permissions/clearCurrent');
export const updatePermissionsWithNew = createAction<PermissionEntity>('permissions/updatePermissionsWithNew');
export const updatePermissionsWithDelete = createAction<{ id: string }>('permissions/updatePermissionsWithDelete');
export const setMockPermissionData = createAction<PermissionEntity>('permissions/setMockPermissionData');

export function onPermissionLogout(a: Action) {
  return (
    clearCurrentPermission.type === a.type ||
    logOutPermissionThunk.fulfilled.type === a.type ||
    logOutPermissionThunk.rejected.type === a.type
  );
}
