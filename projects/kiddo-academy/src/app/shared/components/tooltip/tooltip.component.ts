import { Component, Input } from '@angular/core';

@Component({
  selector: 'kiddo-academy-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

  @Input() text!: string;
  @Input() position!: string;

  constructor() { }

}
