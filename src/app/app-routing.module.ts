import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterDetailComponent } from './pages/hero-detail/hero-detail.component';
import { CharacterListComponent } from './pages/hero-list/hero-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'page/*',
    data: { animation: 'list' },
  },
  {
    path: 'page/:pageNumber',
    component: CharacterListComponent,
    data: { animation: 'list' },
    pathMatch: 'full',
  },
  {
    path: 'detail/:heroId',
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
