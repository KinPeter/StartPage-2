import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public isSpinning: Subject<boolean>;
  private progresses: boolean[];

  constructor() {
    this.progresses = [];
    this.isSpinning = new Subject();
    this.isSpinning.next(false);
  }

  show(): void {
    this.isSpinning.next(true);
    this.progresses.push(true);
  }

  hide(): void {
    if (this.progresses.length === 0) {
      this.isSpinning.next(false);
    } else if (this.progresses.length === 1) {
      this.progresses.pop();
      this.isSpinning.next(false);
    } else {
      this.progresses.pop();
    }
  }
}
