import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState: MemoizedSelector<object, AuthState> =
  createFeatureSelector<AuthState>('auth');

export const selectUsername: MemoizedSelector<object, string | undefined> =
  createSelector(selectAuthState, (state: AuthState) => state.username);

export const selectPassword: MemoizedSelector<object, string | undefined> =
  createSelector(selectAuthState, (state: AuthState) => state.password);

// this 'admin' should not be hard coded here
// please handle this as a simplification
export const selectIsAdmin: MemoizedSelector<object, boolean> = createSelector(
  selectAuthState,
  (state: AuthState) => state.username === 'admin'
);
