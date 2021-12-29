import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';

const routes: Routes = [
  { path: '', component: HeroListComponent, data: { animation: 'list' } },
  {
    path: 'detail',
    component: HeroDetailComponent,
    data: { animation: 'detail' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
