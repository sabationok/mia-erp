import { AnyAction, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'redux/auth/auth.types';
import { AuthErrorType } from 'redux/reduxTypes.types';
// import { actionLogInUser, actionLogOutUser, actionSetCurrentUser } from './authActions';
import { getAllUsersThunk } from './usersThunks';

export interface IUsersState {
  users: any[];
  isLoading: boolean;
  error: any;
}

const initialState: IUsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  // extraReducers: {
  //* ОТРИМАТИ ВСІХ КОРИСТУВАЧІВ
  // [getAllUsersThunk.fulfilled]: (state: IUsersState, { payload }: PayloadAction<number>) => {
  //   state.isLoading = false;
  //   state.users = [...payload];
  //   console.log('getAllUsersThunk', payload);
  // },
  // },
  extraReducers: builder => {
    builder
      .addCase(getAllUsersThunk.fulfilled, (state: Draft<IUsersState>, { payload }: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.users = [...payload];
      })
      .addMatcher(inPending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(inError, (state, action: PayloadAction<AuthErrorType>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

function inPending(action: AnyAction) {
  return action.type.endsWith('pending');
}

function inError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const usersReducer = usersSlice.reducer;

// [getAllUsersThunk.pending]: (state, action) => {
//   state.isLoading = true;
// },
// [getAllUsersThunk.rejected]: (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// },
// // * РЕЄСТРАЦІЯ АДМІНІСТРАТОРОМ
// [registerUserByAdminThunk.fulfilled]: (state, { payload }) => {
//   state.isLoading = false;
// },
// [registerUserByAdminThunk.pending]: (state, action) => {
//   state.isLoading = true;
// },
// [registerUserByAdminThunk.rejected]: (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload.error;
// },
// //* ВХІД
// [logInUserThunk.fulfilled]: (state, { payload }) => {
//   state.isLoading = false;
//   state.isLoggedIn = true;
//   state.token = payload.access_token;
// },
// [logInUserThunk.pending]: (state, { payload }) => {
//   state.isLoading = true;
// },
// [logInUserThunk.rejected]: (state, action) => {
//   state.isLoading = false;
//   state.isLoggedIn = false;
//   state.error = action.payload.error;
// },

// //* ВИХІД
// [logOutUserThunk.fulfilled]: (state, action) => {
//   state.isLoading = false;
//   state.isLoggedIn = false;
//   state.user = initialState.user;
//   state.token = null;
// },
// [logOutUserThunk.pending]: (state, action) => {
//   state.isLoading = true;
// },
// [logOutUserThunk.rejected]: (state, action) => {
//   state.isLoading = true;
//   state.error = action.payload.error;
// },
// //* ПОТОЧНИЙ ЮЗЕР
// [getCurrentUserThunk.fulfilled]: (state, { payload }) => {
//   state.isLoading = false;
//   state.isLoggedIn = true;

//   state.user = { ...state.user, ...payload };
// },
// [getCurrentUserThunk.pending]: (state, action) => {
//   state.isLoading = true;
// },
// [getCurrentUserThunk.rejected]: (state, action) => {
//   state.isLoading = false;
//   state.error = action.error;
//   state.isLoggedIn = false;
// },
