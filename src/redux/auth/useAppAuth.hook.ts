import { useAuthSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IAuthState } from './auth.types';
import { ILoginUserData, IRegistrationData, logInUserThunk, registerUserThunk } from './auth.thunks';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';

export interface IRecoveryPasswordReqData {
  email?: string;
  password?: string;
  approvePassword?: string;
}

interface CreateAuthServiceReturnType {
  sendRecoveryEmail: SubmitHandler<Pick<IRecoveryPasswordReqData, 'email'>>;
  loginUser: SubmitHandler<Pick<ILoginUserData, 'email' | 'password'>>;
  registerUser: SubmitHandler<IRegistrationData>;
}

function createAuthService(dispatch: AppDispatch, authState: IAuthState): CreateAuthServiceReturnType {
  return {
    sendRecoveryEmail: ({ email }: Pick<IRecoveryPasswordReqData, 'email'>) => {
      console.log('Recovery email', email);
    },
    loginUser: ({ email, password }: Partial<ILoginUserData>) => {
      const payload = {
        submitData: { email, password },
        onSuccess: () => {
          console.log(email, password);
          toast.success(`Wellcome: ${email}`);
        },
        onError: () => {},
      };
      dispatch(logInUserThunk(payload));
      return;
    },
    registerUser: ({ name, secondName, email, password }: IRegistrationData) => {
      const payload = {
        submitData: { name, secondName, email, password },
        onSuccess: () => {},
        onError: () => {},
      };
      dispatch(registerUserThunk(payload));
      return;
    },
  };
}

interface AuthService extends CreateAuthServiceReturnType {
  dispatch: AppDispatch;
  state: IAuthState;
}

const useAuthService = (): AuthService => {
  const dispatch: AppDispatch = useAppDispatch();
  const state = useAuthSelector();
  const service = createAuthService(dispatch, state);

  return {
    dispatch,
    state,
    ...state,
    ...service,
  };
};

export default useAuthService as typeof useAuthService;
