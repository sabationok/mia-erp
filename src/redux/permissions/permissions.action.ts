import { createAction } from '@reduxjs/toolkit';
import { PermissionEntity } from '../../types/permissions.types';

export const clearCurrentPermission = createAction('permissions/clearCurrent');
export const updatePermissionsWithNew = createAction<PermissionEntity>('permissions/updatePermissionsWithNew');
export const updatePermissionsWithDelete = createAction<{ id: string }>('permissions/updatePermissionsWithDelete');
export const setMockPermissionData = createAction<PermissionEntity>('permissions/setMockPermissionData');
