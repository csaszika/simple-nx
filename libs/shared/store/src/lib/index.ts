import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { EnvironmentProviders } from '@angular/core';
import { CardsEffects, cardsReducer } from './cards';
import { authReducer } from './auth';

export * from './auth';
export * from './cards';

export const provideCardsStoreConfiguration: () => EnvironmentProviders[] =
  () => [provideEffects([CardsEffects]), provideState('cards', cardsReducer)];
export const provideAuthStoreConfiguration: () => EnvironmentProviders[] =
  () => [provideState('auth', authReducer)];
