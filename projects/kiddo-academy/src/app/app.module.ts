import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GamePageComponent } from './game-page/game-page.component';
import { HomeComponent } from './home/home.component';
import { BannerComponent } from './home/banner/banner.component';
import { LevelsListComponent } from './home/levels-list/levels-list.component';
import { LevelCardComponent } from './home/levels-list/level-card/level-card.component';
import { SceneToggleComponent } from './home/scene-toggle/scene-toggle.component';
import { AboutDevelopersPageComponent } from './about-developers-page/about-developers-page.component';
import { AboutProjectPageComponent } from './about-project-page/about-project-page.component';
import { TaskEditorPageComponent } from './task-editor-page/task-editor-page.component';
import { CodeEmbeddingPageComponent } from './code-embedding-page/code-embedding-page.component';
import { LevelTestingPageComponent } from './level-testing-page/level-testing-page.component';
import { ACE_CONFIG, AceConfigInterface, AceModule } from 'ngx-ace-wrapper';
import 'brace';
import 'brace/mode/javascript';
import 'brace/mode/yaml';
import 'brace/theme/tomorrow_night_eighties';
import { SceneConfigurationHelpPageComponent } from './scene-configuration-help-page/scene-configuration-help-page.component';

const DEFAULT_ACE_CONFIG: AceConfigInterface = {
  fontSize: 'inherit',
  theme: 'tomorrow_night_eighties',
  printMargin: 140,
  wrap: true,
};

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', `.json?timestamp=${Date.now()}`);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    GamePageComponent,
    HomeComponent,
    BannerComponent,
    LevelsListComponent,
    LevelCardComponent,
    SceneToggleComponent,
    AboutDevelopersPageComponent,
    AboutProjectPageComponent,
    TaskEditorPageComponent,
    CodeEmbeddingPageComponent,
    LevelTestingPageComponent,
    SceneConfigurationHelpPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AceModule,
    MarkdownModule.forRoot({ loader: HttpClientModule }),
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: ACE_CONFIG,
      useValue: DEFAULT_ACE_CONFIG
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
