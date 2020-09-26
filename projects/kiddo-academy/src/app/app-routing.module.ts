import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { GamePageComponent } from './game-page/game-page.component';
import { AboutDevelopersPageComponent } from './about-developers-page/about-developers-page.component';
import { AboutProjectPageComponent } from './about-project-page/about-project-page.component';
import { TaskEditorPageComponent } from './task-editor-page/task-editor-page.component';
import { CodeEmbeddingPageComponent } from './code-embedding-page/code-embedding-page.component';
import { LevelTestingPageComponent } from './level-testing-page/level-testing-page.component';
import { SceneConfigurationHelpPageComponent } from './scene-configuration-help-page/scene-configuration-help-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'play/:scene/:level', component: GamePageComponent },
  { path: 'task-editor', component: TaskEditorPageComponent },
  { path: 'scene-config-help', component: SceneConfigurationHelpPageComponent },
  { path: 'about-developers', component: AboutDevelopersPageComponent },
  { path: 'about-project', component: AboutProjectPageComponent },
  { path: 'embed-code', component: CodeEmbeddingPageComponent },
  { path: 'launch-level', component: LevelTestingPageComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
