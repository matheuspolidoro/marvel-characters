import { Component } from '@angular/core';
import { slideAnimation } from './animations/slide.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideAnimation],
})
export class AppComponent {}
