import { useAuthSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IAuthState, ILoginUserData, IRegistrationData } from './auth.types';
import { logInUserThunk, registerUserThunk } from './auth.thunks';
import { ServiceDispatcher } from '../global.types';

interface AuthService {
  dispatch: AppDispatch;
  state: IAuthState;
  sendRecoveryEmail: ServiceDispatcher<Pick<ILoginUserData, 'email'>>;
  recoveryPassword: ServiceDispatcher<Pick<ILoginUserData, 'password'>>;
  loginUser: ServiceDispatcher<ILoginUserData>;
  registerUser: ServiceDispatcher<IRegistrationData>;
}

const useAuthService = (): AuthService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useAuthSelector();

  return {
    dispatch,
    state,
    ...state,
    sendRecoveryEmail: payload => dispatch(logInUserThunk(payload)),
    loginUser: payload => dispatch(logInUserThunk(payload)),
    registerUser: payload => dispatch(registerUserThunk(payload)),
    recoveryPassword: payload => console.log(payload),
  };
};

export default useAuthService as typeof useAuthService;
