import { Component, OnInit, ViewChild, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ModalDirective } from '../shared/directives/modal.directive';
import { ScenesService } from '../shared/services/scenes.service';
import { SceneDetails } from '../shared/interfaces';

@Component({
  selector: 'kiddo-academy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('copyKiddoModal') copyKiddoModal!: ModalDirective;

  isFetchingTasks = false;
  scenesList: SceneDetails[] = [];
  selectedScene!: SceneDetails;
  levelConfigurationCode!: string;
  readonly i18nPrefix = 'HOME.';
  private removeLangChangeListener!: () => void;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private scenesService: ScenesService,
  ) { }

  ngOnInit(): void {
    this.fetchTasks();

    this.removeLangChangeListener = this.renderer.listen('document', 'LangChangeEvent', event => {
      this.fetchTasks();
    });
  }

  ngOnDestroy(): void {
    this.removeLangChangeListener();
  }

  handleSceneTypeChange(selectedSceneIndex: number): void {
    this.selectedScene = this.scenesService.getSceneDetailsList()[selectedSceneIndex];
    // needed in order to show the last selected tab. Can't be stored in service because of page reloading after navigating to /play/ route
    this.scenesService.setLastSelectedSceneIndex(selectedSceneIndex.toString());
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateWithPageReloadTo(route: string): void {
    window.location.href = route;
  }

  private fetchTasks(): void {
    this.isFetchingTasks = true;

    this.scenesService
      .fetchScenesUrls()
      .then(() => this.scenesService.fetchAllScenesDetails())
      .then(scenesList => {
        this.scenesList = scenesList;
        this.selectedScene = scenesList[this.scenesService.getLastSelectedSceneIndex()];
      })
      .finally(() => this.isFetchingTasks = false);
  }

}
