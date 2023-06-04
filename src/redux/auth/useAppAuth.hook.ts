import { useAuthSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IAuthState, ILoginUserData, IRegistrationData } from './auth.types';
import { logInUserThunk, registerUserThunk } from './auth.thunks';
import { ServiceDispatcher } from '../global.types';
import { useMemo } from 'react';

interface AuthServiceDispatchers {
  sendRecoveryEmail: ServiceDispatcher<Pick<ILoginUserData, 'email'>>;
  recoveryPassword: ServiceDispatcher<Pick<ILoginUserData, 'password'>>;
  loginUser: ServiceDispatcher<ILoginUserData>;
  registerUser: ServiceDispatcher<IRegistrationData>;
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
      sendRecoveryEmail: payload => dispatch(logInUserThunk(payload)),
      loginUser: payload => dispatch(logInUserThunk(payload)),
      registerUser: payload => dispatch(registerUserThunk(payload)),
      recoveryPassword: payload => console.log(payload),
    };
  }, [dispatch]);

  return {
    dispatch,
    state,
    ...dispatchers,
  };
};

export default useAuthService as typeof useAuthService;
