import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-floating-circle-button',
    template: `
    <button>
        <i class="fas fa-plus"></i>
    </button>
    <div class="{{ side }}">
        <p>{{ message }}</p>
    </div>
    `,
    styleUrls: ['./floating-circle-button.component.scss']
})
export class FloatingCircleButtonComponent implements OnInit {

    @Input() message: string;
    @Input() side: string;

    constructor() { }

    ngOnInit() {
    }

}
