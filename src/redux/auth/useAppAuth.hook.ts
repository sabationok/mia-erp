import { useAuthSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IAuthState } from './auth.slice';
import {
  registerUserThunk,
  logInUserThunk,
  logOutUserThunk,
  getCurrentUserThunk,
  IPayloadRegisterUser,
  IRegistrationData,
} from './auth.thunks';

const registration = (dispatch: AppDispatch, authState: IAuthState) => {
  function registerUser({ email, password }: IRegistrationData) {
    const payload = {
      submitData: { email, password },
      onSuccess: () => {},
      onError: () => {},
    };
    dispatch(registerUserThunk(payload));
    return;
  }
  return registerUser;
};

const useAppAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAuthSelector();

  return {
    dispatch,
    useRegistration: registration(dispatch, authState),
    ...authState,
  };
};

export default useAppAuth;
