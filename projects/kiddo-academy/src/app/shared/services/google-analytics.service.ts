import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { environment } from 'projects/kiddo-academy/src/environments/environment';

// tslint:disable-next-line: ban-types
declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  subscribeToRouterEvents(router: Router): void {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', environment.googleAnalyticsKey,
          {
            page_path: event.urlAfterRedirects
          }
        );
      }
    });
  }

  emitEvent(eventCategory: string, eventAction: string, eventLabel: any = null, eventValue: any = null): void {
    if (typeof gtag === 'undefined') {
      return;
    }

    gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: eventValue,
    });
  }

}
