import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';

const routes: Routes = [
  {
    path: '',
    component: HeroListComponent,
    pathMatch: 'full',
    data: { animation: 'list' },
  },
  {
    path: 'page/:pageNumber',
    component: HeroListComponent,
    data: { animation: 'list' },
    pathMatch: 'full',
  },
  {
    path: 'detail/:heroId',
    component: HeroDetailComponent,
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
