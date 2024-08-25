import { Action, createAction } from '@reduxjs/toolkit';
import { UserEntity } from '../../types/auth/auth.types';
import { logOutUserThunk } from './auth.thunks';
import { onPermissionLogout } from '../permissions/permissions.action';

export const SetLoggedUserAction = createAction<UserEntity & { access_token?: string }>('auth/setLoggedUser');
export const LogOutUserAction = createAction('auth/logOutUser');

export function onUserLogout(a: Action) {
  return (
    LogOutUserAction.type === a.type ||
    logOutUserThunk.fulfilled.type === a.type ||
    logOutUserThunk.rejected.type === a.type ||
    onPermissionLogout(a)
  );
}
