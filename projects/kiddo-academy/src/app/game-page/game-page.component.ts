import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ScenesService } from '../shared/services/scenes.service';
import { GamePlayerService } from '../shared/services/game-player.service';
import { ModalDirective } from '../shared/directives/modal.directive';
import { environment } from '../../environments/environment';
import { I18nService } from '../shared/services';

interface NeighboringLevels {
  previous: string;
  next: string;
}

@Component({
  selector: 'kiddo-academy-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('gamePage', { static: true }) gamePageRef!: ElementRef;
  @ViewChild('player', { static: false }) playerRef!: ElementRef;
  @ViewChild('mobileWarningModal') mobileWarningModal!: ModalDirective;

  playerAppConfig!: string;
  fetchingLevelConfiguration = false;
  fetchingLevelError = false;
  levelConfigurationUrl!: string;
  levelDescription!: string;
  sceneName!: string;
  levelName!: string;
  neighboringLevels: NeighboringLevels = { previous: '', next: '' };
  readonly i18nPrefix = 'GAME-PAGE.';
  private removeLangChangeListener!: () => void;
  timestamp!: number;

  constructor(
    public router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private scenesService: ScenesService,
    private gamePlayerService: GamePlayerService,
    private i18nService: I18nService,
  ) { }

  ngOnInit(): void {
    this.gamePageRef.nativeElement.scrollIntoView();
    console.log(this.i18nService);
    this.timestamp = this.i18nService.getTimestamp();

    const routeParams: Params = { ...this.route.snapshot.params };
    this.setBreadCrumbsData(routeParams?.scene, routeParams?.level);
    this.configureAndEmbedPlayer(routeParams?.scene, routeParams?.level, this.i18nService.getCurrentLanguage());

    this.removeLangChangeListener = this.renderer.listen('document', 'LangChangeEvent', event => {
      this.configureAndEmbedPlayer(routeParams?.scene, routeParams?.level, event.detail.lang);
    });
  }

  ngAfterViewInit(): void {
    this.gamePlayerService.getMobileDevicesList()
      .then(mobileDevicesList => {
        const mobileDevicesString: string = mobileDevicesList.join('|');
        const reg = new RegExp(mobileDevicesString + '/i');
        if (reg.test(navigator.userAgent)) {
          this.mobileWarningModal.open();
        }
      });
  }

  ngOnDestroy(): void {
    this.removeLangChangeListener();
  }

  onPreviousLevelClick(): void {
    if (this.neighboringLevels.previous) {
      window.location.href = this.neighboringLevels.previous;
    }
  }

  onNextLevelClick(): void {
    if (this.neighboringLevels.next) {
      window.location.href = this.neighboringLevels.next;
    }
  }

  private configureAndEmbedPlayer(sceneName: string, levelName: string, lang: string): void {
    this.fetchingLevelError = false;
    this.fetchingLevelConfiguration = true;

    this.deriveNeighboringLevels(sceneName, levelName);
    this.levelConfigurationUrl = `${environment.sceneTypesUrl}/${lang}/${sceneName}/${levelName}/task.yaml?timestamp=${this.timestamp}`;

    this.scenesService.fetchLevelConfiguration(this.levelConfigurationUrl)
      .then(levelConfiguration => this.processFetchedConfiguration(levelConfiguration, lang))
      .catch(() => this.fetchingLevelError = true)
      .finally(() => this.fetchingLevelConfiguration = false);
  }

  private deriveNeighboringLevels(sceneName: string, levelName: string): void {
    this.scenesService.fetchSceneDetails(sceneName)
      .then(sceneDetails => {
        const currentLevelIndex = sceneDetails.tasks.findIndex(level => level === levelName);
        if (currentLevelIndex !== -1) {
          this.neighboringLevels.previous = sceneDetails.tasks[currentLevelIndex - 1]
            ? `/play/${sceneName}/${sceneDetails.tasks[currentLevelIndex - 1]}?levelNumber=${currentLevelIndex}`
            : '';
          this.neighboringLevels.next = sceneDetails.tasks[currentLevelIndex + 1]
            ? `/play/${sceneName}/${sceneDetails.tasks[currentLevelIndex + 1]}?levelNumber=${currentLevelIndex + 2}`
            : '';
        }
      });
  }

  private setBreadCrumbsData(sceneName: string, level: string): void {
    this.sceneName = sceneName;
    this.levelName = level;
  }

  private processFetchedConfiguration(levelConfiguration: string, lang: string): void {
    this.gamePlayerService.parseAndSetLevelConfiguration(levelConfiguration);
    this.gamePlayerService.updatePlayerAppConfiguration({
      language: {
        useOnly: lang
      }
    });
    this.gamePlayerService.appendPlayerScriptToDocument();

    this.levelDescription = this.gamePlayerService.getLevelDescription();
    this.playerAppConfig = JSON.stringify(this.gamePlayerService.getPlayerAppConfiguration());
  }

}
