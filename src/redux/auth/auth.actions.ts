import { createAction } from '@reduxjs/toolkit';
import { UserEntity } from '../../types/auth.types';

export const SetLoggedUserAction = createAction<UserEntity & { acces_token?: string }>('auth/setLoggedUser');
