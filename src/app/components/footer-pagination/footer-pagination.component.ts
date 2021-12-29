import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer-pagination',
  templateUrl: './footer-pagination.component.html',
  styleUrls: ['./footer-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterPaginationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
