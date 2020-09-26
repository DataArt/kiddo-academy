import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleAnalyticsService } from '../../services';
import { environment } from 'projects/kiddo-academy/src/environments/environment';

@Component({
  selector: 'kiddo-academy-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent {
  @Input() acceptButtonText!: string;
  @Output() acceptClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();

  readonly i18nPrefix = 'MODAL.';

  constructor(private googleAnalyticsService: GoogleAnalyticsService) { }

  onAcceptClick(): void {
    this.googleAnalyticsService.emitEvent(environment.googleAnalyticsEvents.info, 'modal-message: accept_click');
    this.acceptClick.emit();
  }

  onCancelClick(): void {
    this.googleAnalyticsService.emitEvent(environment.googleAnalyticsEvents.info, 'modal-message: cancel_click');
    this.cancelClick.emit();
  }

}
