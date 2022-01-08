import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  ApiMarvelCharacterService,
  IHeaderParams,
} from '../../services/api-marvel-character.service';
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
    private apiMarvelCharacter: ApiMarvelCharacterService,
    private router: Router
  ) {
    this.activePage$ = apiMarvelCharacter.activePage;
    this.apiMarvelSubject$ = apiMarvelCharacter.apiMarvelSubject;
  }

  private subscription = new Subscription();

  activePage$;
  apiMarvelSubject$;
  characters = undefined;
  loadingCharacters = new BehaviorSubject<boolean>(true);
  cantFindCharacters = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    this.subscription.add(
      this.activePage$.subscribe((page) => {
        this.loadingCharacters.next(true);

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
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToDetail(character: any) {
    this.router.navigate([`/detail/${character.id}`], {
      state: { character: character },
    });
  }

  searchCharacter(text: any) {
    this.loadingCharacters.next(true);

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
    let timer: any;
    clearTimeout(timer);

    timer = setTimeout(() => {
      this.searchCharacter(text.target.value);
    }, 500);
  }
}
