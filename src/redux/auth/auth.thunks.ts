import { IRegisteredUser, RegisterDto } from '../../types/auth/auth.types';
import { ThunkArgs } from '../store.store';
import AuthApi from '../../api/auth/auth.api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

export enum AuthThunkTypeEnum {
  register = 'auth/registerThunk',
  logIn = 'auth/logInUserThunk',
  logOut = 'auth/logOutUserThunk',
  getCurrent = 'auth/getCurrentUserThunk',
}

export const registerUserThunk = createAppAsyncThunk<IRegisteredUser, ThunkArgs<RegisterDto>>(
  AuthThunkTypeEnum.register,
  AuthApi.register
);

export const logInUserThunk = createAppAsyncThunk(AuthThunkTypeEnum.logIn, AuthApi.logInUser);

export const logOutUserThunk = createAppAsyncThunk(AuthThunkTypeEnum.logOut, AuthApi.logOutUser);

export const getCurrentUserThunk = createAppAsyncThunk(AuthThunkTypeEnum.getCurrent, AuthApi.getCurrentUser);
