import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public isShown: Subject<boolean>;
  public message: Subject<string>;
  public alertClass: Subject<string>;

  constructor() {
    this.isShown = new Subject();
    this.message = new Subject();
    this.alertClass = new Subject();
    this.isShown.next(false);
  }

  show(message: string, alertClass: string): void {
    this.isShown.next(true);
    this.message.next(message);
    this.alertClass.next(alertClass);
    setTimeout(
      () => {
        this.isShown.next(false);
      },
      alertClass === 'success' ? 2000 : 5000
    );
  }
}
