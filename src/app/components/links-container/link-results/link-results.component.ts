import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Link } from 'src/app/interfaces/link';
import { LinksService } from 'src/app/services/links.service';

@Component({
  selector: 'app-link-results',
  templateUrl: './link-results.component.html',
  styleUrls: ['./link-results.component.scss'],
})
export class LinkResultsComponent implements OnInit {
  public closing = false;
  @Input() results: Link[];
  @Output() closeResults = new EventEmitter<void>();
  @ViewChild('elementRef', { static: true }) eRef: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @HostListener('document:click', ['$event']) clickOutside = (event: MouseEvent): void => {};

  constructor(public linkService: LinksService) {}

  ngOnInit() {
    setTimeout(() => {
      this.clickOutside = this.onClickOutside;
    }, 500);
  }

  onCloseResults(): void {
    this.closing = true;
    setTimeout(() => {
      this.closeResults.emit();
    }, 300);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.onCloseResults();
    }
  }
}
