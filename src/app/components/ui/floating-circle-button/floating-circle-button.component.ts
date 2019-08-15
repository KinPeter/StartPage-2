import { Component, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-floating-circle-button',
    template: '<button><i class="fas fa-plus"></i></button>',
    styleUrls: ['./floating-circle-button.component.scss']
})
export class FloatingCircleButtonComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
