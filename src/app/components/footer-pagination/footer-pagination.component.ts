import { ApiMarvelCharacterService } from '../../services/api-marvel-character.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import {
  forkJoin,
  Subject,
  Subscription,
  BehaviorSubject,
  Observable,
  combineLatest,
} from 'rxjs';

interface Ia {
  display: boolean;
  value: number;
}

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
  activePage$: Observable<number>;
  previousPage$ = new BehaviorSubject<Ia>({ display: false, value: -1 });
  nextPage$ = new BehaviorSubject<Ia>({ display: false, value: -1 });
  private subscription = new Subscription();

  ngOnInit(): void {
    /*
     * ouve observables da api e da página setada
     * para tratar as páginas que aparecem no footer
     */
    this.subscription = combineLatest([
      this.apiMarvel$,
      this.activePage$,
    ]).subscribe(([apiData, activePage]) => {
      let numOfPages = this.numberOfPages(apiData.data.total);
      this.pages$.next(numOfPages);

      if (activePage >= 1 && activePage <= numOfPages) {
        this.previousPage$.next({
          display: activePage != 1,
          value: activePage - 1,
        });
        this.nextPage$.next({
          display: activePage != numOfPages,
          value: activePage - -1,
        });
      } else {
        this.previousPage$.next({ display: false, value: -1 });
        this.nextPage$.next({ display: false, value: -1 });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /*
   * de acordo com numero de personagens
   * se estabelece número de páginas
   */
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
