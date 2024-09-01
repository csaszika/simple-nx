/* eslint  @typescript-eslint/typedef: "off" */
import { createAction, props } from '@ngrx/store';
import { CardItem } from '@simple-nx/models';

export const getCards = createAction('[Cards] Get cards');

export const getCardsSuccess = createAction(
  '[Cards] Get cards Success',
  props<{ cards: CardItem[] }>()
);

export const getCardsFailed = createAction('[Cards] Get cards Failed');

export const addNewCard = createAction(
  '[Cards] Add new card',
  props<{ card: CardItem }>()
);
