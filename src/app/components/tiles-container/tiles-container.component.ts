import { Component, OnInit } from '@angular/core';
import { TileService } from 'src/app/services/tile.service';
import { Tiles } from 'src/app/interfaces/tile';
import { QuerySnapshot } from '@angular/fire/firestore';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tiles-container',
  templateUrl: './tiles-container.component.html',
  styleUrls: ['./tiles-container.component.scss'],
})
export class TilesContainerComponent implements OnInit {
  public tiles: Tiles;
  public isLoggedIn: boolean;
  public addingTile: boolean;

  constructor(
    public tileService: TileService,
    public spinner: SpinnerService,
    public alert: AlertService,
    public auth: AuthService
  ) {
    this.tiles = {
      top: [],
      coding: [],
      google: [],
      fun: [],
      others: [],
    };
    this.addingTile = false;
  }

  ngOnInit() {
    this.spinner.show();
    this.tileService.tiles.subscribe(
      (data: QuerySnapshot<unknown>) => {
        Object.keys(this.tiles).forEach(key => {
          this.tiles[key] = [];
        });
        this.tileService.distributeTilesFromQuerySnapshot(data, this.tiles);
        this.tileService.sortTilesByPriority(this.tiles);
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.alert.show('Fetch of tiles failed.', 'danger');
        console.log(error);
      }
    );
    this.auth.loggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  onAddTile(): void {
    this.addingTile = true;
  }

  onCancel(): void {
    this.addingTile = false;
  }
}
