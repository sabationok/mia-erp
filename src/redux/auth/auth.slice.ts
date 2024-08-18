import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthErrorType } from 'redux/reduxTypes.types';
import { getCurrentUserThunk, logInUserThunk, logOutUserThunk, registerUserThunk } from './auth.thunks';
import { UserEntity } from '../../types/auth/auth.types';
import { SetLoggedUserAction } from './auth.actions';
import { isString } from 'lodash';
import { PermissionEntity } from '../../types/permissions.types';
import { Action } from '../store.store';
import { IBase } from '../../types/utils.types';

export interface AuthState {
  user?: UserEntity & { session?: AuthSession.Entity };
  permission: PermissionEntity;
  access_token?: string;
  refresh_token?: string;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: AuthErrorType;
}

export namespace AuthSession {
  interface BaseEntity extends IBase {
    access_token: '';
    refresh_token: '';
  }

  export type Entity = BaseEntity;
}

const initialState: AuthState = {
  user: undefined,
  permission: { _id: '' },
  access_token: '',
  refresh_token: '',
  isLoading: true,
  isLoggedIn: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessTokensAction: (st, a: Action<{ access_token: string; refresh_token?: string }>) => {
      st.access_token = a.payload.access_token;
      st.refresh_token = a.payload.refresh_token;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(SetLoggedUserAction, (s, a) => {
        s.user = a.payload;
        s.access_token = a.payload.acces_token;
        s.isLoggedIn = true;
        s.user = {
          ...a.payload,
          avatarURL:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fuk.wikipedia.org%2Fwiki%2F%25D0%259F%25D1%2596%25D0%25B4%25D0%25B4%25D1%2583%25D0%25B1%25D0%25BD%25D0%25B8%25D0%25B9_%25D0%2586%25D0%25B2%25D0%25B0%25D0%25BD_%25D0%259C%25D0%25B0%25D0%25BA%25D1%2581%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%25D0%25B8%25D1%2587&psig=AOvVaw1bKwdWzf52CXjh_Q27FYn5&ust=1692433465292000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjq9I7k5YADFQAAAAAdAAAAABAQ',
        };
      })
      .addCase(logInUserThunk.fulfilled, (s, { payload }) => {
        s.isLoading = false;
        s.access_token = payload.access_token;
        s.isLoggedIn = true;
        s.user = {
          ...payload,
          avatarURL:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fuk.wikipedia.org%2Fwiki%2F%25D0%259F%25D1%2596%25D0%25B4%25D0%25B4%25D1%2583%25D0%25B1%25D0%25BD%25D0%25B8%25D0%25B9_%25D0%2586%25D0%25B2%25D0%25B0%25D0%25BD_%25D0%259C%25D0%25B0%25D0%25BA%25D1%2581%25D0%25B8%25D0%25BC%25D0%25BE%25D0%25B2%25D0%25B8%25D1%2587&psig=AOvVaw1bKwdWzf52CXjh_Q27FYn5&ust=1692433465292000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjq9I7k5YADFQAAAAAdAAAAABAQ',
        };
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
      .addCase(logOutUserThunk.rejected, state => {
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
      .addMatcher(inFulfilled, state => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(inError, (state, action: PayloadAction<AuthErrorType>) => {
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const { setAccessTokensAction } = authSlice.actions;

export function isAuthCase(type: string) {
  return isString(type) && type.startsWith('users');
}
function inPending(a: AnyAction) {
  return isAuthCase(a.type) && a.type.endsWith('pending');
}
function inFulfilled(a: AnyAction) {
  return isAuthCase(a.type) && a.type.endsWith('fulfilled');
}
function inError(a: AnyAction) {
  return isAuthCase(a.type) && a.type.endsWith('rejected');
}
