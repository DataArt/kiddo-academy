import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SceneDetails } from '../shared/interfaces';
import { ScenesService } from '../shared/services';

@Component({
  selector: 'kiddo-academy-new-year-page',
  templateUrl: './new-year-page.component.html',
  styleUrls: ['./new-year-page.component.scss']
})
export class NewYearPageComponent implements OnInit, OnDestroy {
  isFetching = false;
  newYearScene?: SceneDetails;
  readonly homeI18nPrefix = 'HOME.';
  readonly newYearI18Prefix = 'NEW-YEAR.';
  private readonly sceneName = 'new_year';
  private removeLangChangeListener!: () => void;

  constructor(private scenesService: ScenesService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.fetchScene();

    this.removeLangChangeListener = this.renderer.listen('document', 'LangChangeEvent', _ => {
      this.fetchScene();
    });
  }

  ngOnDestroy(): void {
    this.removeLangChangeListener();
  }

  /** Fetching new year tasks */
  private async fetchScene(): Promise<void> {
    this.isFetching = true;

    try {
      const fetchedNewYearScene = await this.scenesService.fetchSceneDetails(this.sceneName);

      // Opening scenes doesn't work without this mapping. Probably should be handled elsewhere
      fetchedNewYearScene.tasks = fetchedNewYearScene.tasks.map(taskId => `${this.sceneName}/${taskId}`);

      this.newYearScene = fetchedNewYearScene;
    } catch (error) {
      console.log(error);
    } finally {
      this.isFetching = false;
    }
  }
}
