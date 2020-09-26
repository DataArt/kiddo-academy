import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { I18nService } from '../shared/services';

@Component({
  selector: 'kiddo-academy-code-embedding-page',
  templateUrl: './code-embedding-page.component.html',
  styleUrls: ['./code-embedding-page.component.scss']
})
export class CodeEmbeddingPageComponent implements OnInit {

  env = environment;
  readonly i18nPrefix = 'CODE-EMBEDDING-PAGE.';
  timestamp!: number;

  constructor(private i18n: I18nService) { }

  ngOnInit(): void {
    this.timestamp = this.i18n.getTimestamp();
  }

}
