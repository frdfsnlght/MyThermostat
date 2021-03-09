import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-button',
  template: `
    <button (click)="onClick.emit($event)" class="p-button-text p-button-lg p-button-plain p-button p-component p-ripple">
      <span [class]="this.icon + ' p-button-icon p-button-icon-left'"></span>
      <span>{{this.label}}</span>
    </button>
  `
})
export class SidebarButtonComponent {

  @Input() icon: string;
  @Input() label: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
