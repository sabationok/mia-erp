import { useAuthSelector } from 'redux/selectors.store';
import { AppDispatch, useAppDispatch } from 'redux/store.store';
import { IAuthState } from './auth.slice';
import { registerUserThunk, IRegistrationData } from './auth.thunks';
// logInUserThunk,
// logOutUserThunk,
// getCurrentUserThunk,
// IPayloadRegisterUser,
const registration = (dispatch: AppDispatch, authState: IAuthState) => {
  function registerUser({ name, secondName, email, password }: IRegistrationData) {
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

const useAppAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAuthSelector();

  return {
    dispatch,
    useRegistration: () => registration(dispatch, authState),
    ...authState,
  };
};

export default useAppAuth;
