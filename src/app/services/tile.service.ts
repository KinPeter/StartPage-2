import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tile } from '../interfaces/tile';
import { Tiles } from '../interfaces/tiles';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class TileService {

    public tilesCollection = this.db.collection<Tile>('tiles');
    public tiles: Observable<QuerySnapshot<any>>;

    constructor(
            public db: AngularFirestore,
        ) {
        this.fetchTiles();
    }

    fetchTiles(): void {
        this.tiles = this.tilesCollection.get();
    }

    distributeTilesFromQuerySnapshot(data: QuerySnapshot<any>, tilesObject: Tiles): void {
        data.docs.forEach((doc: QueryDocumentSnapshot<any>) => {
            const category = doc.data().category;
            tilesObject[category].push({
                ...doc.data(),
                id: doc.id
            });
        });
    }

    sortTilesByPriority(tilesObject: Tiles): void {
        Object.keys(tilesObject).forEach((key) => {
            tilesObject[key].sort((t1: Tile, t2: Tile) => {
                return t1.priority - t2.priority;
            });
        });
    }

}
