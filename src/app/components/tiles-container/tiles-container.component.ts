import { Component, OnInit } from '@angular/core';
import { TileService } from 'src/app/services/tile.service';
import { Tiles } from 'src/app/interfaces/tiles';
import { Tile } from 'src/app/interfaces/tile';
import { QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    selector: 'app-tiles-container',
    templateUrl: './tiles-container.component.html',
    styleUrls: ['./tiles-container.component.scss']
})
export class TilesContainerComponent implements OnInit {

    public tiles: Tiles;

    constructor(
            public tileService: TileService,
            public spinner: SpinnerService,
            public alert: AlertService
        ) {
        this.tiles = {
            top: [],
            coding: [],
            google: [],
            fun: [],
            others: []
        };
    }

    ngOnInit() {
        this.spinner.show();
        this.tileService.tiles.subscribe((data: QuerySnapshot<any>) => {
            this.tileService.distributeTilesFromQuerySnapshot(data, this.tiles);
            this.tileService.sortTilesByPriority(this.tiles);
            this.spinner.hide();
            console.log(this.tiles);
        },
        (error: any) => {
            this.spinner.hide();
            this.alert.show('Fetch of tiles failed.', 'danger');
            console.log(error);
        });
    }

}
