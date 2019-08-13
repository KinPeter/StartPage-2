import { Component, OnInit } from '@angular/core';
import { TileService } from 'src/app/services/tile.service';
import { Tiles } from 'src/app/interfaces/tiles';
import { Tile } from 'src/app/interfaces/tile';

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
        this.tileService.tiles.subscribe((data: Tile[]) => {
            data.forEach((tile: Tile) => {
                this.tiles[tile.category].push(tile);
            });

            // sort
            Object.keys(this.tiles).forEach((key) => {
                this.tiles[key].sort((t1: Tile, t2: Tile) => {
                    return t1.priority - t2.priority;
                });
            });

            console.log(this.tiles);
        });
    }

}
