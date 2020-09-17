import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Tile } from 'src/app/interfaces/tile';
import { TileService } from 'src/app/services/tile.service';

@Component({
  selector: 'app-add-tile',
  templateUrl: './add-tile.component.html',
  styleUrls: ['./add-tile.component.scss'],
})
export class AddTileComponent implements OnInit, AfterViewInit {
  public closing = false;
  public tile: Tile;
  @Output() canceling = new EventEmitter<void>();
  @ViewChild('f', { static: true }) searchForm: NgForm;
  @ViewChild('tileNameInput', { static: true }) tileNameInput: ElementRef;
  @ViewChild('elementRef', { static: true }) eRef: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @HostListener('document:click', ['$event']) clickOutside = (event: MouseEvent): void => {};

  constructor(public tileService: TileService) {
    this.tile = {
      name: '',
      link: '',
      category: '',
      icon: '',
      priority: null,
    };
  }

  ngOnInit() {
    setTimeout(() => {
      this.clickOutside = this.onClickOutside;
    }, 500);
  }

  ngAfterViewInit() {
    this.tileNameInput.nativeElement.focus();
  }

  onSubmit(): void {
    console.log(this.tile);
    this.tileService.addNewTile(this.tile);
    this.onCloseAddTile();
  }

  onCloseAddTile(): void {
    this.closing = true;
    setTimeout(() => {
      this.canceling.emit();
    }, 300);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.onCloseAddTile();
    }
  }
}
