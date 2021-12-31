import { ApiMarvelHeroService } from './../../services/api-marvel-hero.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-content-body',
  templateUrl: './content-body.component.html',
  styleUrls: ['./content-body.component.scss'],
})
export class ContentBodyComponent implements OnInit {
  constructor(
    private apiMarvelHero: ApiMarvelHeroService,
    private route: ActivatedRoute
  ) {
    this.heroes$ = this.apiMarvelHero.charactersSubject;
  }

  heroes$: Observable<any>;
  page: number = 0;
  subscription: Subscription | undefined;

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params) => {
      this.page = params?.pageNumber ?? 0;
      if (this.page == 0) {
        this.apiMarvelHero.getCharacters({ limit: 10, offset: 0 });
      } else {
        this.apiMarvelHero.getCharacters({ limit: 10, offset: this.page * 10 });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  searchCharacter(text: any) {
    console.log('searchCharacter text: ', text);
    if (text !== '') this.apiMarvelHero.getCharacters({ nameStartsWith: text });
    else this.apiMarvelHero.getCharacters({ limit: 10, offset: 0 });
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
