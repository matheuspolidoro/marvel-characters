import { ApiMarvelCharacterService } from 'src/app/services/api-marvel-character.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
})
export class CharacterDetailComponent implements OnInit {
  constructor(
    public router: Router,
    private apiService: ApiMarvelCharacterService,
    private route: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation()?.extras.state?.character) {
      this.dataFromNavigation =
        this.router.getCurrentNavigation()?.extras.state?.character;
    }
  }

  dataFromNavigation: any = null;
  character$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  subscription$ = new Subscription();
  characterNotFound: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  imageSource: any;

  ngOnInit() {
    if (this.dataFromNavigation) {
      this.character$.next(this.dataFromNavigation);
      this.imageSource =
        this.dataFromNavigation.thumbnail.path +
        '.' +
        this.dataFromNavigation.thumbnail.extension;
    } else {
      this.subscription$ = this.route.params.subscribe((params) => {
        if (params?.characterId) {
          this.apiService
            .getCharacterDetail(params.characterId)
            .subscribe((apiRes) => {
              this.character$.next(apiRes.data.results[0]);
              this.imageSource =
                apiRes.data.results[0].thumbnail.path +
                '.' +
                apiRes.data.results[0].thumbnail.extension;
            }),
            () => this.characterNotFound.next(true);
        } else {
          this.router.navigate(['../../1'], { relativeTo: this.route });
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
