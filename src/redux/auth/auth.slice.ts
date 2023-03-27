import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { karina_avatar } from 'img';
import { AuthErrorType } from 'redux/reduxTypes.types';
// import { actionLogInUser, actionLogOutUser, actionSetCurrentUser } from './authActions';
import { registerUserThunk, logInUserThunk, logOutUserThunk } from './auth.thunks';
export interface IRole {
  _id: string;
  name: string;
  actions: string[];
}
export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatarURL?: string;
}
export interface IAuthState {
  user: IUser;
  accessToken: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: AuthErrorType;
}
// const initialUserRole: IRole = {
//   _id: '',
//   name: '',
//   actions: [],
// };
const initialUser: IUser = {
  _id: 'sdth651g6db5fg16d',
  name: 'Каріна Дизайнівна Дизайнер',
  email: 'karina.des@mail.com',
  avatarURL: karina_avatar,
};

const initialState: IAuthState = {
  user: initialUser,
  accessToken: 'accessToken',
  isLoading: false,
  isLoggedIn: true,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(logInUserThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.accessToken = payload.accessToken;
        state.user.email = payload.email;
      })
      .addCase(registerUserThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(logOutUserThunk.fulfilled, state => {
        state.isLoading = false;
        state = initialState;
      })
      .addMatcher(inPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(inError, (state, action: PayloadAction<AuthErrorType>) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});
function inPending(action: AnyAction) {
  return action.type.endsWith('pending');
}
function inError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const authReducer = authSlice.reducer;
// extraReducers: {
//   //* РЕЄСТРАЦІЯ
//   [registerUserThunk.fulfilled]: (state, { payload }) => {
//     state.isLoading = false;
//     state.isLoggedIn = false;

//     console.log(payload);
//   },
//   [registerUserThunk.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [registerUserThunk.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload.error;
//   },
//   // * РЕЄСТРАЦІЯ АДМІНІСТРАТОРОМ
//   [registerUserByAdminThunk.fulfilled]: (state, { payload }) => {
//     state.isLoading = false;
//   },
//   [registerUserByAdminThunk.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [registerUserByAdminThunk.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload.error;
//   },
//   //* ВХІД
//   [logInUserThunk.fulfilled]: (state, { payload }) => {
//     state.isLoading = false;
//     state.isLoggedIn = true;
//     state.token = payload.access_token;
//   },
//   [logInUserThunk.pending]: (state, { payload }) => {
//     state.isLoading = true;
//   },
//   [logInUserThunk.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.isLoggedIn = false;
//     state.error = action.payload.error;
//   },

//   //* ВИХІД
//   [logOutUserThunk.fulfilled]: (state, action) => {
//     state.isLoading = false;
//     state.isLoggedIn = false;
//     state.user = initialState.user;
//     state.token = null;
//   },
//   [logOutUserThunk.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [logOutUserThunk.rejected]: (state, action) => {
//     state.isLoading = true;
//     state.error = action.payload.error;
//   },
//   //* ПОТОЧНИЙ ЮЗЕР
//   [getCurrentUserThunk.fulfilled]: (state, { payload }) => {
//     state.isLoading = false;
//     state.isLoggedIn = true;

//     state.user = { ...state.user, ...payload };
//   },
//   [getCurrentUserThunk.pending]: (state, action) => {
//     state.isLoading = true;
//   },
//   [getCurrentUserThunk.rejected]: (state, action) => {
//     state.isLoading = false;
//     state.error = action.error;
//     state.isLoggedIn = false;
//   },
// },
