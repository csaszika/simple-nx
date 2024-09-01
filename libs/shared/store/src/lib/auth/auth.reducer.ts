import { ActionReducer, createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';

export interface AuthState {
  username?: string;
  password?: string;
}

export const initialAuthState = (): AuthState => ({});

export const authReducer: ActionReducer<AuthState> = createReducer(
  initialAuthState(),
  on(
    login,
    (
      state: AuthState,
      { username, password }: { username: string; password: string }
    ) => ({
      ...state,
      username,
      password,
    })
  ),
  on(logout, (state: AuthState) => ({
    ...state,
    username: undefined,
    password: undefined,
  }))
);
