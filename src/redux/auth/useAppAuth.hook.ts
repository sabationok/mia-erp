import { useAuthSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IAuthState } from './auth.types';
import {
  ILoginUserData,
  IRegistrationData,
  logInUserThunk,
  registerUserThunk,
} from './auth.thunks';
import { toast } from 'react-toastify';

const registration = (dispatch: AppDispatch, authState: IAuthState) => {
  function registerUser({
    name,
    secondName,
    email,
    password,
  }: IRegistrationData) {
    const payload = {
      submitData: { name, secondName, email, password },
      onSuccess: () => {},
      onError: () => {},
    };
    dispatch(registerUserThunk(payload));
    return;
  }

  return registerUser as typeof registerUser;
};

const loginUser = (dispatch: AppDispatch, authState: IAuthState) => {
  function login({ email, password }: Partial<ILoginUserData>) {
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
  }

  return login as typeof login;
};
const useAuthService = () => {
  const dispatch = useAppDispatch();
  const state = useAuthSelector();

  return {
    dispatch,
    ...state,
    registerUser: registration(dispatch, state),
    loginUser: loginUser(dispatch, state),
  };
};
export type AuthService = ReturnType<typeof useAuthService>;
export default useAuthService;
