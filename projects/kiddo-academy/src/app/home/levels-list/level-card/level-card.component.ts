import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kiddo-academy-level-card',
  templateUrl: './level-card.component.html',
  styleUrls: ['./level-card.component.scss']
})


export class LevelCardComponent implements OnInit {

  @Input() taskUrl!: string;
  @Input() levelNumber!: number;
  @Input() passedLevels!: string[];
  taskUrlSubpaths: string[] = [];
  readonly i18nPrefix = 'LEVEL_CARD.';
  levelPassed!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.taskUrlSubpaths = this.taskUrl.split('/');

    this.levelPassed = this.passedLevels.includes(`/play/${this.taskUrl}`);
  }

}
