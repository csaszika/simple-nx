import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { cardListAnimation, CardsComponent } from '@simple-nx/components';
import { Store } from '@ngrx/store';
import { CardItem } from '@simple-nx/models';
import { getCards, selectCards, selectIsAdmin } from '@simple-nx/store';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-card-manager',
  standalone: true,
  imports: [CardsComponent, MatButton, RouterLink],
  templateUrl: './card-manager.component.html',
  styleUrl: './card-manager.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardListAnimation],
})
export default class CardManagerComponent implements OnInit {
  store: Store = inject(Store);

  isDeleteAllowed: Signal<boolean> = this.store.selectSignal(selectIsAdmin);
  cards: Signal<CardItem[]> = this.store.selectSignal(selectCards);
  // or with Observable + async pipe would be used on the template
  //cards$: Observable<CardItem[]> = this.store.pipe(select(selectCards));

  ngOnInit(): void {
    this.store.dispatch(getCards());
  }
}
