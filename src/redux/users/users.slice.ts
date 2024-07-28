import { AnyAction, createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { AuthErrorType } from 'redux/reduxTypes.types';
// import { actionLogInUser, actionLogOutUser, actionSetCurrentUser } from './authActions';
import { getAllUsersThunk } from './users.thunks';
import { checks, sliceCleaner } from '../../utils';
import { onUserLogout } from '../auth/auth.actions';

export interface UsersState {
  users: any[];
  isLoading: boolean;
  error: any;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUsersThunk.fulfilled, (state: Draft<UsersState>, { payload }) => {
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
      })
      .addMatcher(inFulfilled, (state, action: PayloadAction<AuthErrorType>) => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(onUserLogout, sliceCleaner(initialState));
  },
});

function isUsersCase(type: string) {
  return checks.isStr(type) && type.startsWith('users');
}
function inPending(a: AnyAction) {
  return isUsersCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isUsersCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isUsersCase(a.type) && a.type.endsWith('rejected');
}
