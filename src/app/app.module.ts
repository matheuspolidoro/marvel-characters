import { ApiMarvelHeroService } from './services/api-marvel-hero.service';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroDetailComponent } from './pages/hero-detail/hero-detail.component';
import { HeroListComponent } from './pages/hero-list/hero-list.component';

@NgModule({
  declarations: [AppComponent, HeroDetailComponent, HeroListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
  ],
  providers: [ApiMarvelHeroService],
  bootstrap: [AppComponent],
})
export class AppModule {}
