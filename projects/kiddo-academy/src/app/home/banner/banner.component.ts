import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GoogleAnalyticsService } from '../../shared/services';
import { environment } from 'projects/kiddo-academy/src/environments/environment';

@Component({
  selector: 'kiddo-academy-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent {

  @Input() header!: string;
  @Input() buttonText!: string;
  @Input() imageSrc!: string;
  @Output() buttonClick = new EventEmitter();

  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  onButtonClick(): void {
    this.googleAnalyticsService.emitEvent(environment.googleAnalyticsEvents.buttonClick, 'banner: button_clicked');
    this.buttonClick.emit();
  }

}
