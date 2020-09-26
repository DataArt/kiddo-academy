import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

import { SceneDetails } from '../../shared/interfaces';
import { ScenesService } from '../../shared/services/scenes.service';
import { GoogleAnalyticsService } from '../../shared/services';
import { environment } from 'projects/kiddo-academy/src/environments/environment';

@Component({
  selector: 'kiddo-academy-scene-toggle',
  templateUrl: './scene-toggle.component.html',
  styleUrls: ['./scene-toggle.component.scss']
})
export class SceneToggleComponent implements OnInit {

  @Input() scenesDetails: SceneDetails[] = [];
  @Output() sceneSelected = new EventEmitter<number>();

  selectedScene!: SceneDetails;
  readonly i18nPrefix = 'SCENE_TOGGLE.';

  constructor(
    private scenesService: ScenesService,
    private googleAnalyticsService: GoogleAnalyticsService,
  ) { }

  ngOnInit(): void {
    const lastSelectedTab = this.scenesService.getLastSelectedSceneIndex();
    this.selectedScene = lastSelectedTab < this.scenesDetails.length
      ? this.scenesDetails[+lastSelectedTab]
      : this.scenesDetails[0];
  }

  onSelectScene(tabNumber: number): void {
    this.googleAnalyticsService.emitEvent(environment.googleAnalyticsEvents.tabClick, 'home-page: scene_tab_click');
    this.selectedScene = this.scenesDetails[tabNumber];
    this.sceneSelected.emit(tabNumber);
  }

}
