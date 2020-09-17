import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-floating-circle-button',
  template: `
    <button>
      <i *ngIf="icon === 'plus'" class="fas fa-plus"></i>
      <i *ngIf="icon === 'search'" class="fas fa-search"></i>
    </button>
    <div class="{{ side }}">
      <p>{{ message }}</p>
    </div>
  `,
  styleUrls: ['./floating-circle-button.component.scss'],
})
export class FloatingCircleButtonComponent implements OnInit {
  @Input() message: string;
  @Input() side: string;
  @Input() icon: string;

  constructor() {}

  ngOnInit() {}
}
