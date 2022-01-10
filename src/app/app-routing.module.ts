import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailComponent } from './pages/character-detail/character-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'page/1',
    data: { animation: 'list' },
  },
  {
    path: 'page/:pageNumber',
    component: CharacterListComponent,
    data: { animation: 'list' },
    pathMatch: 'full',
  },
  {
    path: 'detail/:characterId',
    component: CharacterDetailComponent,
    pathMatch: 'full',
    data: { animation: 'detail' },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
