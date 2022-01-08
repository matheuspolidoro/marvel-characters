import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  constructor(public router: Router) {
    console.log(
      '%c%s',
      'color: #f279ca',
      this.router.getCurrentNavigation()?.extras.state?.character.id
    );
  }

  state$: Observable<object>;

  ngOnInit() {}
}
