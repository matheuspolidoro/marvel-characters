import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit, OnChanges {
  @Input('character') character: any;

  constructor() {}

  charName: string = '';
  imageSource: string = '';
  imageAlt: string = '';

  imageNotFound = 'assets/Error_perspective_matte.png';

  seriesList = [] as any;
  eventsList = [] as any;

  ngOnChanges(): void {
    this.imageAlt = this.character.name;
    this.imageSource =
      this.character.thumbnail.path + '.' + this.character.thumbnail.extension;
    this.charName = this.character.name;

    for (let index = 0; index < 3; index++) {
      this.character.series.items[index]
        ? this.seriesList.push(this.character.series.items[index])
        : null;

      this.character.events.items[index]
        ? this.eventsList.push(this.character.series.items[index])
        : null;
    }
  }

  ngOnInit(): void {}
}
