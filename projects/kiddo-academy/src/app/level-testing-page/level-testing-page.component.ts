import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AceConfigInterface } from 'ngx-ace-wrapper';

import { GamePlayerService } from '../shared/services/game-player.service';
import { GoogleAnalyticsService, I18nService } from '../shared/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'kiddo-academy-level-testing-page',
  templateUrl: './level-testing-page.component.html',
  styleUrls: ['./level-testing-page.component.scss']
})
export class LevelTestingPageComponent implements OnInit, OnDestroy {

  @ViewChild('levelTestingPage', { static: true }) levelTestingPageRef!: ElementRef;
  @ViewChild('playerWrapper', { static: true }) playerWrapperRef!: ElementRef;
  @ViewChild('player', { static: true }) playerRef!: ElementRef;

  playerAppConfig!: string;
  levelConfigurationCode!: string;
  readonly editorConfig: AceConfigInterface = {
    fontSize: 'inherit',
    mode: 'yaml',
  };
  readonly i18nPrefixPath = 'LEVEL-TESTING-PAGE.';
  private removeLangChangeListener!: () => void;

  constructor(
    private renderer: Renderer2,
    private gamePlayerService: GamePlayerService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private i18nService: I18nService,
  ) { }

  ngOnInit(): void {
    this.levelTestingPageRef.nativeElement.scrollIntoView();

    this.updatePlayerLanguageConfig(this.i18nService.getCurrentLanguage());
    this.playerAppConfig = JSON.stringify(this.gamePlayerService.getPlayerAppConfiguration());

    this.i18nService.translateAsync(this.i18nPrefixPath)('INITIAL_CODE')
      .then(translatedText => {
        if (!this.levelConfigurationCode) {
          this.levelConfigurationCode = translatedText;
        }
      });

    this.removeLangChangeListener = this.renderer.listen('document', 'LangChangeEvent', event => {
      this.updatePlayerLanguageConfig(event.detail.lang);
      this.playerAppConfig = JSON.stringify(this.gamePlayerService.getPlayerAppConfiguration());
    });

    if (localStorage.getItem(environment.localStorageKeys.levelConfig)) {
      this.levelConfigurationCode = localStorage.getItem(environment.localStorageKeys.levelConfig) as string;
      this.gamePlayerService.parseAndSetLevelConfiguration(this.levelConfigurationCode);
      this.gamePlayerService.configureAndLaunchPlayer(this.playerRef.nativeElement);
      this.playerWrapperRef.nativeElement.scrollIntoView();
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem(environment.localStorageKeys.levelConfig);
    this.removeLangChangeListener();
  }

  onLaunchLevelClick(levelConfiguration: string): void {
    this.googleAnalyticsService.emitEvent(environment.googleAnalyticsEvents.info, '/launch-level: launch_level_click');

    this.gamePlayerService.parseAndSetLevelConfiguration(levelConfiguration);
    this.gamePlayerService.configureAndLaunchPlayer(this.playerRef.nativeElement);

    this.playerWrapperRef.nativeElement.scrollIntoView();
  }

  private updatePlayerLanguageConfig(lang: string): void {
    this.gamePlayerService.updatePlayerAppConfiguration({
      language: {
        useOnly: lang
      }
    });
  }

}
