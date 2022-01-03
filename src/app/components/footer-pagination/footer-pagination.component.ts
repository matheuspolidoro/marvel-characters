import { ApiMarvelCharacterService } from './../../services/api-marvel-hero.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-pagination',
  templateUrl: './footer-pagination.component.html',
  styleUrls: ['./footer-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterPaginationComponent implements OnInit {
  constructor(
    private apiMarvelCharacter: ApiMarvelCharacterService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.activePage$ = apiMarvelCharacter.activePage;
    this.apiMarvel$ = apiMarvelCharacter.apiMarvelSubject;
    this.pages$ = apiMarvelCharacter.pages;
  }

  pages$;
  apiMarvel$;
  activePage$;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.apiMarvel$.subscribe((value: any) => {
      value ? this.pages$.next(this.numberOfPages(value.data.total)) : 0;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  numberOfPages(totalCharacters: number) {
    let pageTemp;

    let divisionResult = totalCharacters % 10;

    if (divisionResult !== 0) {
      pageTemp =
        divisionResult > 1
          ? Math.ceil(totalCharacters / 10)
          : Math.floor(totalCharacters / 10);
    } else {
      pageTemp = totalCharacters / 10;
    }

    return pageTemp;
  }
}
