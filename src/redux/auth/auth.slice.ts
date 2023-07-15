import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { getCurrentUserThunk, logInUserThunk, logOutUserThunk, registerUserThunk } from './auth.thunks';
import { IAuthState } from './auth.types';
import { karina_avatar } from '../../img';

const initialState: IAuthState = {
  user: {
    _id: '',
    avatarURL: karina_avatar,
  },
  permission: { _id: '' },
  access_token: '',
  isLoading: true,
  isLoggedIn: false,
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
        state.access_token = payload.access_token;
        state.isLoggedIn = true;
        state.user = { ...payload, avatarURL: karina_avatar };
      })
      .addCase(registerUserThunk.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(logOutUserThunk.fulfilled, state => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.user = initialState.user;
        state.permission = initialState.permission;
        state.access_token = '';
      })
      .addCase(getCurrentUserThunk.fulfilled, state => {
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
