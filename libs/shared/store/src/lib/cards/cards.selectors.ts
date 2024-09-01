import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import { CardsState } from './cards.reducer';
import { CardItem } from '@simple-nx/models';

export const selectCardsState: MemoizedSelector<object, CardsState> =
  createFeatureSelector<CardsState>('cards');

export const selectCards: MemoizedSelector<object, CardItem[]> = createSelector(
  selectCardsState,
  (state: CardsState) => state.cards
);

export const selectCardsLoading: MemoizedSelector<object, boolean> =
  createSelector(selectCardsState, (state: CardsState) => state.loading);

export const selectCardsError: MemoizedSelector<object, boolean> =
  createSelector(selectCardsState, (state: CardsState) => state.error);

export const selectCardsLoaded: MemoizedSelector<object, boolean> =
  createSelector(selectCardsState, (state: CardsState) => state.loaded);
