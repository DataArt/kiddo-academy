import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ModalMessageComponent } from './components/modal-message/modal-message.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ModalDirective } from './directives/modal.directive';
import { DropdownDirective } from './directives/dropdown.directive';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LanguageNativePipe, ExtractNumberPipe } from './pipes';
import { InnerDropdownDirective } from './directives/inner-dropdown.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';


@NgModule({
  declarations: [
    ModalMessageComponent,
    BreadcrumbsComponent,
    ModalDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    PageNotFoundComponent,
    LanguageNativePipe,
    ExtractNumberPipe,
    InnerDropdownDirective,
    TooltipComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    CommonModule,
    ModalMessageComponent,
    BreadcrumbsComponent,
    ModalDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    LanguageNativePipe,
    ExtractNumberPipe,
    InnerDropdownDirective,
    TooltipComponent,
  ]
})
export class SharedModule { }
