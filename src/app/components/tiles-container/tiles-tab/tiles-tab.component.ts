import { Component, OnInit, Input } from '@angular/core';
import { Tile } from 'src/app/interfaces/tile';

@Component({
  selector: 'app-tiles-tab',
  templateUrl: './tiles-tab.component.html',
  styleUrls: ['./tiles-tab.component.scss'],
})
export class TilesTabComponent implements OnInit {
  @Input() tabTitle: string;
  @Input() tabNumber: string;
  @Input() tiles: Tile[];
  isOpen = false;

  constructor() {}

  ngOnInit() {}
}
