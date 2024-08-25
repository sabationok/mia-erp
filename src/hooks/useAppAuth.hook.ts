import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { LoginUserDto, RegisterDto } from '../types/auth/auth.types';
import { logInUserThunk, logOutUserThunk } from '../redux/auth/auth.thunks';
import {
  __ServiceDispatcherAsync,
  ServiceApiCaller,
  ServiceDispatcher,
  ServiceDispatcherAsync,
} from '../redux/app-redux.types';
import { useMemo } from 'react';
import { defaultApiCallPayload, defaultThunkPayload } from '../utils/fabrics';
import { SetLoggedUserAction } from '../redux/auth/auth.actions';
import { apiCall } from '../api';
import AuthApi from '../api/auth/auth.api';

export interface AuthService {
  sendRecoveryEmail: ServiceDispatcherAsync<Pick<LoginUserDto, 'email'>>;
  logOutUser: __ServiceDispatcherAsync<typeof logOutUserThunk>;
  loginUser: __ServiceDispatcherAsync<typeof logInUserThunk>;
  register: ServiceApiCaller<RegisterDto>;
  recoveryPassword: (...args: any[]) => void;
  setLoggedUser: ServiceDispatcher;
}
const useAuthService = (): AuthService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): AuthService => {
    return {
      sendRecoveryEmail: arg => dispatch(logInUserThunk(defaultThunkPayload(arg))),
      loginUser: arg => dispatch(logInUserThunk(arg)),
      logOutUser: arg => dispatch(logOutUserThunk(arg)),
      register: arg => apiCall(AuthApi.register, defaultApiCallPayload(arg)),
      recoveryPassword: arg => {
        console.log(defaultThunkPayload(arg));
      },
      setLoggedUser: user => dispatch(SetLoggedUserAction(user)),
    };
  }, [dispatch]);
};

export default useAuthService;
