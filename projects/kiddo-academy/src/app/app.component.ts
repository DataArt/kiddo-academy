import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { I18nService } from './shared/services/i18n.service';
import { GoogleAnalyticsService } from './shared/services';

@Component({
  selector: 'kiddo-academy-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading = false;
  sceneTypes!: string[];

  constructor(
    private router: Router,
    private i18nService: I18nService,
    private googleAnalyticsService: GoogleAnalyticsService,
  ) { }

  ngOnInit(): void {
    this.googleAnalyticsService.subscribeToRouterEvents(this.router);
    this.isLoading = true;

    this.i18nService.processLanguageConfiguration()
      .then(() => this.isLoading = false);
  }

}
