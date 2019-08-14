import { Component, OnInit } from '@angular/core';
import { TileService } from 'src/app/services/tile.service';
import { Tiles } from 'src/app/interfaces/tiles';
import { Tile } from 'src/app/interfaces/tile';
import { QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';

@Component({
    selector: 'app-tiles-container',
    templateUrl: './tiles-container.component.html',
    styleUrls: ['./tiles-container.component.scss']
})
export class TilesContainerComponent implements OnInit {

    public tiles: Tiles;

    constructor(public tileService: TileService) {
        this.tiles = {
            top: [],
            coding: [],
            google: [],
            fun: [],
            others: []
        };
    }

    ngOnInit() {
        this.tileService.tiles.subscribe((data: QuerySnapshot<any>) => {
            this.tileService.distributeTilesFromQuerySnapshot(data, this.tiles);
            this.tileService.sortTilesByPriority(this.tiles);
            console.log(this.tiles);
        });
    }

}
