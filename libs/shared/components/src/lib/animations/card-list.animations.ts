import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

const ENTER = ':enter';

export const cardListAnimation = trigger('cardListAnimation', [
  transition('* => *', [
    query(ENTER, style({ opacity: 0 }), { optional: true }),

    query(
      ENTER,
      stagger('200ms', [
        animate(
          '500ms ease-in',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-70px)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
          ])
        ),
      ]),
      { optional: true }
    ),
  ]),
]);
