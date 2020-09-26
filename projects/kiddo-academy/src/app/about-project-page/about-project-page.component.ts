import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kiddo-academy-about-project-page',
  templateUrl: './about-project-page.component.html',
  styleUrls: ['./about-project-page.component.scss']
})
export class AboutProjectPageComponent implements OnInit {

  readonly i18nPrefix = 'ABOUT-PROJECT-PAGE.';

  constructor() { }

  ngOnInit(): void {
  }

}
