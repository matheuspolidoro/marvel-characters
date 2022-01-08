import { Component, OnInit } from '@angular/core';
import { ApiMarvelCharacterService } from 'src/app/services/api-marvel-character.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
})
export class CharacterListComponent implements OnInit {
  constructor(
    private apiMarvelCharacter: ApiMarvelCharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.activePage = apiMarvelCharacter.activePage;
  }

  activePage;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params?.pageNumber && params.pageNumber > 0) {
        this.activePage.next(params.pageNumber);
      } else {
        this.router.navigate(['../1'], { relativeTo: this.route });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
