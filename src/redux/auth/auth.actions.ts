import { Action, createAction } from '@reduxjs/toolkit';
import { UserEntity } from '../../types/auth.types';
import { logOutUserThunk } from './auth.thunks';
import { onPermissionLogout } from '../permissions/permissions.action';

export const SetLoggedUserAction = createAction<UserEntity & { acces_token?: string }>('auth/setLoggedUser');

export function onUserLogout(a: Action) {
  return a.type === SetLoggedUserAction.type || a.type === logOutUserThunk.fulfilled || onPermissionLogout(a);
}
