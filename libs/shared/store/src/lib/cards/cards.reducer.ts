import { ActionReducer, createReducer, on } from '@ngrx/store';
import {
  addNewCard,
  getCards,
  getCardsFailed,
  getCardsSuccess,
} from './cards.actions';
import { CardItem } from '@simple-nx/models';

export interface CardsState {
  cards: CardItem[];
  loading: boolean;
  error: boolean;
  loaded: boolean;
}

export const initialCardsState = (): CardsState => ({
  cards: [],
  loading: false,
  error: false,
  loaded: false,
});

export const cardsReducer: ActionReducer<CardsState> = createReducer(
  initialCardsState(),
  on(getCards, (state: CardsState) => ({
    ...state,
    loading: true,
    error: false,
  })),
  on(
    getCardsSuccess,
    (state: CardsState, { cards }: { cards: CardItem[] }) => ({
      ...state,
      cards,
      loading: false,
      loaded: true,
    })
  ),
  on(getCardsFailed, (state: CardsState) => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(addNewCard, (state: CardsState, { card }: { card: CardItem }) => ({
    ...state,
    cards: [...state.cards, card],
    loading: false,
    error: true,
  }))
);
