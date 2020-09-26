import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';

import { GamePlayerService } from '../shared/services/game-player.service';
import { ModalDirective } from '../shared/directives/modal.directive';
import { I18nService } from '../shared/services';

@Component({
  selector: 'kiddo-academy-task-editor-page',
  templateUrl: './task-editor-page.component.html',
  styleUrls: ['./task-editor-page.component.scss']
})
export class TaskEditorPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('taskEditorPage', { static: true }) taskEditorPageRef!: ElementRef;
  @ViewChild('player', { static: false }) playerRef!: ElementRef;
  @ViewChild('mobileWarningModal') mobileWarningModal!: ModalDirective;

  playerAppConfig!: string;
  readonly i18nPrefix = 'TASK-EDITOR.';
  private removeLangChangeListener!: () => void;

  constructor(
    private renderer: Renderer2,
    private gamePlayerService: GamePlayerService,
    private i18nService: I18nService,
  ) { }

  ngOnInit(): void {
    this.taskEditorPageRef.nativeElement.scrollIntoView();

    this.updatePlayerLanguageConfig(this.i18nService.getCurrentLanguage());
    this.playerAppConfig = JSON.stringify(this.gamePlayerService.getPlayerAppConfiguration());

    this.removeLangChangeListener = this.renderer.listen('document', 'LangChangeEvent', event => {
      this.updatePlayerLanguageConfig(event.detail.lang);
      this.playerAppConfig = JSON.stringify(this.gamePlayerService.getPlayerAppConfiguration());
    });

    this.gamePlayerService.appendPlayerScriptToDocument();
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

  private updatePlayerLanguageConfig(lang: string): void {
    this.gamePlayerService.updatePlayerAppConfiguration({
      language: {
        useOnly: lang
      }
    });
  }

}
