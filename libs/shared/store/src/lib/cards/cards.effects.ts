import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { getCards, getCardsFailed, getCardsSuccess } from './cards.actions';
import { CardItem } from '@simple-nx/models';
import { concatLatestFrom } from '@ngrx/operators';
import { selectCards } from './cards.selectors';

@Injectable()
export class CardsEffects {
  public loadDepositLimits$: CreateEffectMetadata = createEffect(() =>
    this.actions$.pipe(
      ofType(getCards),
      concatLatestFrom(() => this.store.select(selectCards)),
      switchMap(([_, cardsInStore]: [Action, CardItem[]]) => {
        if (cardsInStore && cardsInStore.length > 0) {
          return of(getCardsSuccess({ cards: cardsInStore }));
        } else {
          // just a simple hack in case of opening list route a first
          // it gives a mock backend response
          return of([
            { title: 'Title 1', description: 'Description 1' },
            { title: 'Title 2', description: 'Description 2' },
            { title: 'Title 3', description: 'Description 3' },
            { title: 'Title 4', description: 'Description 4' },
            { title: 'Title 5', description: 'Description 5' },
          ] as CardItem[]).pipe(
            map((cards: CardItem[]): Action => getCardsSuccess({ cards })),
            catchError(() => of(getCardsFailed()))
          );
        }
      })
    )
  );

  constructor(private actions$: Actions, private readonly store: Store) {}
}
