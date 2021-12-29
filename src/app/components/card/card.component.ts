import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  constructor() {}

  imageSource = null;
  imageAlt = null;
  imageNotFound = 'assets/Error_perspective_matte.png';

  charName = 'Astolfo';
  seriesList = 'Série do Astolfo';
  eventsList = 'Evento Supimpa';
  ngOnInit(): void {}
}
