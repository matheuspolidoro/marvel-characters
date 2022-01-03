import { BehaviorSubject, Subscription } from 'rxjs';
import {
  ApiMarvelCharacterService,
  IHeaderParams,
} from './../../services/api-marvel-hero.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { listAnimation } from 'src/app/animations/list.animation';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.scss'],
  animations: [listAnimation],
})
export class ContentBodyComponent implements OnInit {
  constructor(
    private location: Location,
    private apiMarvelCharacter: ApiMarvelCharacterService
  ) {
    this.activePage$ = apiMarvelCharacter.activePage;
    this.apiMarvelSubject$ = apiMarvelCharacter.apiMarvelSubject;
  }

  private subscription = new Subscription();

  activePage$;
  apiMarvelSubject$;
  characters = undefined;
  loadingCharacters: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  cantFindCharacters: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  ngOnInit(): void {
    this.subscription.add(
      this.activePage$.subscribe((page) => {
        let parametersApi: IHeaderParams;
        parametersApi = {
          limit: 10,
          offset: (page - 1) * 10,
        };
        this.apiMarvelCharacter.getCharacters(parametersApi);
      })
    );

    this.subscription.add(
      this.apiMarvelSubject$.subscribe((val: any) => {
        val ? (this.characters = val.data.results) : this.characters;
        this.loadingCharacters.next(false);
        console.log(
          '%c%s loadingCharacters to FALSE',
          'color: #735656',
          this.loadingCharacters
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchCharacter(text: any) {
    this.loadingCharacters.next(true);

    console.log('searchCharacter text: ', text);
    console.log(
      '%c%s loadingCharacters to TRUE',
      'color: #EEDD56',
      this.loadingCharacters
    );

    if (text !== '') {
      this.apiMarvelCharacter.getCharacters({ nameStartsWith: text });
      this.location.replaceState('/search');
    } else {
      this.apiMarvelCharacter.getCharacters({ limit: 10, offset: 0 });
      this.location.replaceState('/page/1');
    }
  }

  typeSearch(text: any) {
    // debounce no input de search
    console.log('text key: ', text.key);

    let timer: any;
    clearTimeout(timer);

    timer = setTimeout(() => {
      this.searchCharacter(text.target.value);
    }, 500);
  }
}
