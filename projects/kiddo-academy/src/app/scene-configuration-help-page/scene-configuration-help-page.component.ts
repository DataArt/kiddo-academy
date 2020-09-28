import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { environment } from '../../environments/environment';
import { I18nService } from '../shared/services';

@Component({
  selector: 'kiddo-academy-scene-configuration-help-page',
  templateUrl: './scene-configuration-help-page.component.html',
  styleUrls: ['./scene-configuration-help-page.component.scss']
})
export class SceneConfigurationHelpPageComponent implements OnInit {

  @ViewChild('sceneConfigurationHelp', { static: true }) sceneConfigurationHelpRef!: ElementRef;

  activeSection!: string;
  env = environment;
  isLoading = false;
  scenesList: string[] = [];
  loadedMarkdownsCount = 0;
  readonly i18nPrefixPath = 'SCENE-CONFIGURATION-HELP-PAGE.';
  timestamp!: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private i18n: I18nService
  ) { }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;

    this.timestamp = this.i18n.getTimestamp();

    const scenesList = await this.http.get<string[]>(`${environment.sceneTypesUrl}/index.json?timestamp=${this.timestamp}`)
      .toPromise();
    
    this.scenesList = scenesList;
  }

  onMarkdownLoad(): void {
    this.loadedMarkdownsCount++;
    if (this.loadedMarkdownsCount === this.scenesList.length) {
      this.isLoading = false;
      this.scrollViewToFragment(this.activatedRoute.snapshot.fragment);

      this.addScenesSectionsIntersectionObserver();
    }
  }

  private scrollViewToFragment(fragment: string): void {
    this.router.navigate(['.'], { fragment, relativeTo: this.activatedRoute });
  }

  private addScenesSectionsIntersectionObserver(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio === 1) {
          this.activeSection = entry.target.id;
        }
      });
    }, options);

    this.scenesList.forEach(scene => {
      const target = this.sceneConfigurationHelpRef.nativeElement.querySelector(`#${scene}`);
      if (target) {
        observer.observe(target);
      }
    });
  }

}
