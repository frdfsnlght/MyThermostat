import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon',
  template: '<span class="mdi mdi-{{name}}"></span>',
  styles: [`
    :host {
      font-size: 1.7em;
      /*padding: 0.2em;*/
    }
  `]
})
export class IconComponent {

  @Input() name: string;

  constructor() { }

}
