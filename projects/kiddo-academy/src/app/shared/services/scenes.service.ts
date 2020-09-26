import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { SceneDetails } from '../interfaces';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  private scenesUrls: string[] = [];
  private scenesList: SceneDetails[] = [];
  private lastSelectedSceneIndex!: number;

  constructor(
    private http: HttpClient,
    private i18nService: I18nService,
  ) { }

  getSceneDetailsList(): SceneDetails[] {
    return this.scenesList;
  }

  getLastSelectedSceneIndex(): number {
    const indexFromLocalStorage = localStorage.getItem(environment.localStorageKeys.lastSelectedSceneTabNumber) || 0;
    return this.lastSelectedSceneIndex || +indexFromLocalStorage;
  }

  setLastSelectedSceneIndex(index: string): void {
    localStorage.setItem(environment.localStorageKeys.lastSelectedSceneTabNumber, index);
  }

  fetchScenesUrls(): Promise<string[]> {
    this.scenesUrls = [];

    return this.http
      .get<string[]>(`${environment.sceneTypesUrl}/index.json`)
      .toPromise()
      .then(
        fetchedData => {
          this.scenesUrls = fetchedData;
          return this.scenesUrls;
        },
        error => {
          console.log(error);
          return [];
        }
      );
  }

  fetchAllScenesDetails(): Promise<SceneDetails[]> {
    this.scenesList = [];

    const promisifiedRequests = this.scenesUrls.map(sceneUrl =>
      this.http
        .get<SceneDetails>(`${environment.sceneTypesUrl}/${this.i18nService.getCurrentLanguage()}/${sceneUrl}/index.json`)
        .toPromise());

    return Promise.all(promisifiedRequests)
      .then(responses => {
        responses.forEach((sceneDetails, index) => {
          this.scenesList.push({
            ...sceneDetails,
            tasks: sceneDetails.tasks.map(item => `${this.scenesUrls[index]}/${item}`)
          });
        });
        return this.scenesList;
      });
  }

  fetchLevelConfiguration(levelConfigurationUrl: string): Promise<string> {
    return this.http
      .get(levelConfigurationUrl, { responseType: 'text' })
      .toPromise();
  }

  fetchSceneDetails(sceneName: string): Promise<SceneDetails> {
    return this.http
      .get<SceneDetails>(`${environment.sceneTypesUrl}/${this.i18nService.getCurrentLanguage()}/${sceneName}/index.json`)
      .toPromise();
  }

}
