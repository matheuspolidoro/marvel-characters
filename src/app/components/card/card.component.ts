import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input('hero') hero: any;

  constructor() {}

  charName: string = '';
  imageSource: string = '';
  imageAlt: string = '';

  imageNotFound = 'assets/Error_perspective_matte.png';

  seriesList = 'Série do Astolfo';
  eventsList = 'Evento Supimpa';

  ngOnInit(): void {
    this.imageAlt = this.hero.name;
    this.imageSource =
      this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension;
    this.charName = this.hero.name;
  }
}
