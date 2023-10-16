import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ILoginUserData, IRegistrationData } from '../redux/auth/auth.types';
import { logInUserThunk, logOutUserThunk, registerUserThunk } from '../redux/auth/auth.thunks';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { useMemo } from 'react';
import { defaultThunkPayload } from '../utils/fabrics';

export interface AuthService {
  sendRecoveryEmail: ServiceDispatcherAsync<Pick<ILoginUserData, 'email'>>;
  logOutUser: ServiceDispatcherAsync;
  loginUser: ServiceDispatcherAsync<ILoginUserData>;
  registerUser: ServiceDispatcherAsync<IRegistrationData>;
  recoveryPassword: (...args: any[]) => void;
}
const useAuthService = (): AuthService => {
  const dispatch: AppDispatch = useAppDispatch();

  return useMemo((): AuthService => {
    return {
      sendRecoveryEmail: payload => dispatch(logInUserThunk(defaultThunkPayload(payload))),
      loginUser: payload => dispatch(logInUserThunk(defaultThunkPayload(payload))),
      logOutUser: payload => dispatch(logOutUserThunk(defaultThunkPayload(payload))),
      registerUser: payload => dispatch(registerUserThunk(defaultThunkPayload(payload))),
      recoveryPassword: payload => {
        console.log(defaultThunkPayload(payload));
      },
    };
  }, [dispatch]);
};

export default useAuthService;
