import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { MatCard, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardItem } from '@simple-nx/models';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'lib-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    NgForOf,
    MatCardTitle,
    MatCardSubtitle,
    RouterLink,
    MatButton,
    NgIf,
  ],
})
export class CardsComponent {
  cardItems: InputSignal<CardItem[]> = input<CardItem[]>([]);
  isDeleteVisible: InputSignal<boolean> = input<boolean>(true);
  @Output() cardClicked: EventEmitter<CardItem> = new EventEmitter();
}
