import { FooterPaginationComponent } from './footer-pagination/footer-pagination.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ContentBodyComponent } from './content-body/content-body.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentBodyComponent,
    CardComponent,
    FooterPaginationComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    HeaderComponent,
    FooterPaginationComponent,
    ContentBodyComponent,
    CardComponent,
  ],
})
export class ComponentsModule {}
