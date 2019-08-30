import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Tile, Tiles } from '../interfaces/tile';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TileService {

    public tiles: BehaviorSubject<Tile[]>;

    constructor(
            public http: HttpClient,
            public alert: AlertService,
            public spinner: SpinnerService
        ) {
        this.tiles = new BehaviorSubject<Tile[]>([]);
        this.fetchTiles();
    }

    fetchTiles(): void {
        this.http.get('./assets/tiles.json').subscribe((value: Tile[]) => {
            this.tiles.next(value);
        }, (error: any) => {
            this.tiles.error(new Error(error));
        });
    }

    distributeTilesFromQuerySnapshot(data: Tile[], tilesObject: Tiles): void {
        data.forEach((doc: Tile) => {
            const category = doc.category;
            tilesObject[category].push({...doc});
        });
    }

    sortTilesByPriority(tilesObject: Tiles): void {
        Object.keys(tilesObject).forEach((key) => {
            tilesObject[key].sort((t1: Tile, t2: Tile) => {
                return t1.priority - t2.priority;
            });
        });
    }

    addNewTile(tile: Tile): void {
        this.spinner.show();
        setTimeout(() => {
            if (Math.random() > 0.2) {
                const prevTiles = this.tiles.value;
                const newTiles = [...prevTiles, tile];
                this.tiles.next(newTiles);
                this.alert.show('Tile added successfully.', 'success');
            } else {
                this.alert.show('Error adding tile. You were just unlucky, try again!', 'danger');
            }
            this.spinner.hide();
        }, 500);
    }

}
