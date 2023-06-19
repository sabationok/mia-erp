import { useAuthSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IAuthState, ILoginUserData, IRegistrationData } from './auth.types';
import { logInUserThunk, registerUserThunk } from './auth.thunks';
import { ServiceDispatcher, ServiceDispatcherAsync } from '../global.types';
import { useMemo } from 'react';
import { defaultThunkPayload } from '../../utils/fabrics';

interface AuthServiceDispatchers {
  sendRecoveryEmail: ServiceDispatcherAsync<Pick<ILoginUserData, 'email'>>;
  recoveryPassword: ServiceDispatcher<Pick<ILoginUserData, 'password'>>;
  loginUser: ServiceDispatcherAsync<ILoginUserData>;
  registerUser: ServiceDispatcherAsync<IRegistrationData>;
}

interface AuthService extends AuthServiceDispatchers {
  dispatch: AppDispatch;
  state: IAuthState;
}

const useAuthService = (): AuthService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useAuthSelector();

  const dispatchers = useMemo((): AuthServiceDispatchers => {
    return {
      sendRecoveryEmail: async payload => dispatch(logInUserThunk(defaultThunkPayload(payload))),
      loginUser: async payload => dispatch(logInUserThunk(defaultThunkPayload(payload))),
      registerUser: async payload => dispatch(registerUserThunk(defaultThunkPayload(payload))),
      recoveryPassword: payload => console.log(defaultThunkPayload(payload)),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    ...dispatchers,
  };
};

export default useAuthService as typeof useAuthService;
