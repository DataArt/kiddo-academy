import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kiddo-academy-levels-list',
  templateUrl: './levels-list.component.html',
  styleUrls: ['./levels-list.component.scss']
})
export class LevelsListComponent implements OnInit {

  @Input() tasksList: string[] = [];
  passedLevelsList: string[] = [];

  constructor() { }

  ngOnInit(): void {
    const passedLevelsStorageObject = localStorage.getItem('kiddo-passed-levels');
    if (passedLevelsStorageObject) {
      this.passedLevelsList = JSON.parse(passedLevelsStorageObject);
    }
  }

}
