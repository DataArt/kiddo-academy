import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { safeLoad as parseYaml, safeDump as stringifyYaml } from 'js-yaml';

import { environment } from '../../../environments/environment';
import { SceneConfiguration, PlayerAppConfiguration } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GamePlayerService {

  private renderer: Renderer2;
  private gameEngineScriptElement!: any;
  private levelConfiguration!: SceneConfiguration;
  private playerAppConfiguration!: PlayerAppConfiguration;

  constructor(
    rendererFactory: RendererFactory2,
    private http: HttpClient,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  parseAndSetLevelConfiguration(configuration: string): void {
    if (configuration != null) {
      this.levelConfiguration = parseYaml(configuration) as SceneConfiguration;
    }
  }

  getLevelConfiguration(): SceneConfiguration {
    return this.levelConfiguration;
  }

  getStringifiedLevelConfiguration(): string {
    return this.levelConfiguration
      ? stringifyYaml(this.levelConfiguration)
      : '';
  }

  updatePlayerAppConfiguration(configuration: PlayerAppConfiguration): void {
    this.playerAppConfiguration = {
      ...this.playerAppConfiguration,
      ...configuration,
    };
  }

  getPlayerAppConfiguration(): PlayerAppConfiguration {
    return this.playerAppConfiguration;
  }

  getLevelDescription(): string {
    return this.levelConfiguration.taskDescription || '';
  }

  getMobileDevicesList(): Promise<string[]> {
    return this.http.get<string[]>('/assets/files/mobile-devices.json')
      .toPromise();
  }

  checkPlayerScriptAlreadyAppended(): boolean {
    return Boolean(this.gameEngineScriptElement);
  }

  configureAndLaunchPlayer(player: Element): void {
    if (this.levelConfiguration != null && player != null) {
      player.setAttribute('kiddo-scene-config', stringifyYaml(this.levelConfiguration));
    }

    this.appendPlayerScriptToDocument();
  }

  appendPlayerScriptToDocument(): void {
    if (!this.checkPlayerScriptAlreadyAppended()) {
      this.gameEngineScriptElement = this.renderer.createElement('script');
      this.gameEngineScriptElement.src = environment.playerUrl;
      this.gameEngineScriptElement.defer = true;
      this.renderer.appendChild(document.body, this.gameEngineScriptElement);
    }
  }

}
