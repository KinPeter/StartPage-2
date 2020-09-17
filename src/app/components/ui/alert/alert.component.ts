import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-alert',
  template: `
    <div class="app-alert alert alert-{{ alertClass }}" [class.show]="isShown">
      <p>
        <i *ngIf="alertClass === 'success'" class="fas fa-check-circle"></i>
        <i *ngIf="alertClass === 'danger'" class="fas fa-exclamation-circle"></i>
        {{ message }}
      </p>
    </div>
  `,
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  public isShown = false;
  public alertClass = 'success';
  public message = 'default';

  constructor(public alertService: AlertService) {}

  ngOnInit() {
    this.alertService.isShown.subscribe(shown => {
      this.isShown = shown;
    });
    this.alertService.alertClass.subscribe(alertClass => {
      this.alertClass = alertClass;
    });
    this.alertService.message.subscribe(message => {
      this.message = message;
    });
  }
}
