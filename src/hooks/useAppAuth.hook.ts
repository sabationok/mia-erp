import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { ILoginUserData, IRegistrationData } from '../redux/auth/auth.types';
import { logInUserThunk, logOutUserThunk, registerUserThunk } from '../redux/auth/auth.thunks';
import { ServiceDispatcherAsync } from '../redux/global.types';
import { useMemo } from 'react';
import { defaultThunkPayload } from '../utils/fabrics';

interface AuthServiceDispatchers {
  sendRecoveryEmail: ServiceDispatcherAsync<Pick<ILoginUserData, 'email'>>;
  logOutUser: ServiceDispatcherAsync;
  loginUser: ServiceDispatcherAsync<ILoginUserData>;
  registerUser: ServiceDispatcherAsync<IRegistrationData>;
  recoveryPassword: (...args: any[]) => void;
}

interface AuthService extends AuthServiceDispatchers {}

const useAuthService = (): AuthService => {
  const dispatch: AppDispatch = useAppDispatch();
  // const state = useAuthSelector();

  return useMemo((): AuthServiceDispatchers => {
    return {
      sendRecoveryEmail: async payload => dispatch(logInUserThunk(defaultThunkPayload(payload))),
      loginUser: async payload => dispatch(logInUserThunk(defaultThunkPayload(payload))),
      logOutUser: async payload => dispatch(logOutUserThunk(defaultThunkPayload(payload))),
      registerUser: async payload => dispatch(registerUserThunk(defaultThunkPayload(payload))),
      recoveryPassword: async payload => {
        console.log(defaultThunkPayload(payload));
      },
    };
  }, [dispatch]);
};

export default useAuthService as typeof useAuthService;
