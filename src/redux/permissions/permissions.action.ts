import { createAction } from '@reduxjs/toolkit';
import { IPermission } from './permissions.types';

export const clearCurrentPermission = createAction('permissions/clearCurrent');
export const updatePermissionsWithNew = createAction<IPermission>('permissions/updatePermissionsWithNew');
export const updatePermissionsWithDelete = createAction<{ id: string }>('permissions/updatePermissionsWithDelete');
export const setMockPermissionData = createAction<IPermission>('permissions/setMockPermissionData');
