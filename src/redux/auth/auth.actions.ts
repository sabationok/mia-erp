import { createAction } from '@reduxjs/toolkit';
import { IUser } from './auth.types';

export const SetLoggedUserAction = createAction<IUser & { acces_token?: string }>('auth/setLoggedUser');
