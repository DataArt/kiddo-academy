import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kiddo-academy-about-developers-page',
  templateUrl: './about-developers-page.component.html',
  styleUrls: ['./about-developers-page.component.scss']
})
export class AboutDevelopersPageComponent implements OnInit {

  readonly i18nPrefix = 'ABOUT-DEVELOPERS-PAGE.';

  constructor() { }

  ngOnInit(): void {
  }

}
