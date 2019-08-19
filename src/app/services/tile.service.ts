import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot, DocumentReference } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Tile } from '../interfaces/tile';
import { Tiles } from '../interfaces/tiles';
import { SpinnerService } from './spinner.service';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class TileService {

    public tilesCollection = this.db.collection<Tile>('tiles');
    public tiles: Subject<QuerySnapshot<any>>;

    constructor(
            public db: AngularFirestore,
            public alert: AlertService,
            public spinner: SpinnerService
        ) {
        this.tiles = new Subject();
        this.fetchTiles();
    }

    fetchTiles(): void {
        this.tilesCollection.get().subscribe((value: QuerySnapshot<any>) => {
            this.tiles.next(value);
        }, (error: any) => {
            this.tiles.error(new Error(error));
        });
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

    async addNewTile(tile: Tile): Promise<void> {
        this.spinner.show();
        let response: DocumentReference;
        try {
            response = await this.tilesCollection.add(tile);
            this.alert.show('Tile added successfully.', 'success');
            this.fetchTiles();
        } catch (error) {
            console.log(error);
            this.alert.show('Error adding tile. ' + error.message, 'danger');
        } finally {
            this.spinner.hide();
        }
    }

}
