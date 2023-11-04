import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ILoginUserData, IRegistrationData } from '../redux/auth/auth.types';
import { logInUserThunk, logOutUserThunk, registerUserThunk } from '../redux/auth/auth.thunks';
import { ServiceDispatcher, ServiceDispatcherAsync } from '../redux/global.types';
import { useMemo } from 'react';
import { defaultThunkPayload } from '../utils/fabrics';
import { SetLoggedUserAction } from '../redux/auth/auth.actions';

export interface AuthService {
  sendRecoveryEmail: ServiceDispatcherAsync<Pick<ILoginUserData, 'email'>>;
  logOutUser: ServiceDispatcherAsync;
  loginUser: ServiceDispatcherAsync<ILoginUserData>;
  registerUser: ServiceDispatcherAsync<IRegistrationData>;
  recoveryPassword: (...args: any[]) => void;
  setLoggedUser: ServiceDispatcher;
}
const useAuthService = (): AuthService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): AuthService => {
    return {
      sendRecoveryEmail: arg => dispatch(logInUserThunk(defaultThunkPayload(arg))),
      loginUser: arg => dispatch(logInUserThunk(defaultThunkPayload(arg))),
      logOutUser: arg => dispatch(logOutUserThunk(defaultThunkPayload(arg))),
      registerUser: arg => dispatch(registerUserThunk(defaultThunkPayload(arg))),
      recoveryPassword: arg => {
        console.log(defaultThunkPayload(arg));
      },
      setLoggedUser: user => dispatch(SetLoggedUserAction(user)),
    };
  }, [dispatch]);
};

export default useAuthService;
