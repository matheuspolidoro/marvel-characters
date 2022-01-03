import { ApiMarvelCharacterService } from './services/api-marvel-hero.service';
import { ComponentsModule } from './components/components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CharacterDetailComponent } from './pages/hero-detail/hero-detail.component';
import { CharacterListComponent } from './pages/hero-list/hero-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CharacterDetailComponent,
    CharacterListComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule,
  ],
  providers: [ApiMarvelCharacterService],
  bootstrap: [AppComponent],
})
export class AppModule {}
