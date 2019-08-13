import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Tile } from '../interfaces/tile';
import { Tiles } from '../interfaces/tiles';

@Injectable({
    providedIn: 'root'
})
export class TileService {

    public tilesCollection = this.db.collection<Tile>('tiles');
    public tiles: Observable<Tile[]>;

    constructor(public db: AngularFirestore) {
        this.tiles = this.tilesCollection.valueChanges({idField: 'id'});
    }


}
