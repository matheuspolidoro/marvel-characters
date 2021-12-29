import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiMarvelHeroService {
  constructor(private http: HttpClient) {}

  PUBLIC_KEY = '2f0e2b310aa04fc38db5a244787671a6';
  TIME_STAMP = '1626905702';
  HASH = '4ea7f3a87a87891d7e47375c5b4fe3ad';
  URL_API = `https://gateway.marvel.com`;

  AUTH = `ts=${this.TIME_STAMP}&apikey=${this.PUBLIC_KEY}&hash=${this.HASH}`;
}
