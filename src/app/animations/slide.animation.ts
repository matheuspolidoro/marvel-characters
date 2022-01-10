import {
  trigger,
  animate,
  transition,
  style,
  query,
  group,
  animateChild,
} from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  //   transition('list => detail', slideTo('right')),
  transition('list => detail', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          right: 0,
          width: '100%',
        }),
      ],
      { optional: true }
    ),
    query(':enter', [style({ right: '-100%', opacity: 0 })]),
    group([
      query(
        ':leave',
        [animate('500ms ease-out', style({ right: '100%', opacity: 0 }))],
        { optional: true }
      ),
      query(':enter', [
        animate('500ms ease-out', style({ right: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
  transition('* => list', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ right: '100%', opacity: 0 })]),
    group([
      query(
        ':leave',
        [animate('500ms ease-out', style({ right: '-100%', opacity: 0 }))],
        { optional: true }
      ),
      query(':enter', [
        animate('500ms ease-out', style({ right: '0%', opacity: 1 })),
      ]),
    ]),
    query(':enter', animateChild()),
  ]),
]);
