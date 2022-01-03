import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface IHeaderParams {
  name?: string;
  nameStartsWith?: string;
  modifiedSince?: string;
  comics?: number;
  series?: number;
  events?: number;
  stories?: number;
  orderBy?: string;
  limit?: number;
  offset?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiMarvelCharacterService {
  constructor(private http: HttpClient) {}

  apiMarvelSubject = new Subject();
  activePage: BehaviorSubject<number> = new BehaviorSubject(1);
  pages: Subject<number> = new Subject();

  URL_API = `https://gateway.marvel.com`;
  TIME_STAMP = '1';
  PUBLIC_KEY = '1b14d482862c0f1655dcd6dafd818949';
  HASH = '208c5341777661730bb014a638d0726b';

  AUTH = `ts=${this.TIME_STAMP}&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;

  getCharacters(parameters: IHeaderParams) {
    let params = new HttpParams({ fromObject: { ...parameters } });
    this.http
      .get<any>(`${this.URL_API}/v1/public/characters?${this.AUTH}`, {
        params: params,
      })
      .subscribe(
        (res) => {
          this.apiMarvelSubject.next(res);
          console.log('%c%s', 'color: #00b300', res.data.total);
        },
        (error) => console.error('Erro na requisição: ', error)
      );
  }

  getCharacterDetail(characterId: string): Observable<any> {
    return this.http.get<any>(
      `${this.URL_API}/v1/public/characters/${characterId}?${this.AUTH}`
    );
  }
}
