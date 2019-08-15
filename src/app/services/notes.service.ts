import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Note } from '../interfaces/note';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    public notesCollection = this.db.collection<Note>('notes');
    public notes: Observable<QuerySnapshot<any>>;

    constructor(
            public db: AngularFirestore
        ) {
        this.fetchNotes();
    }

    fetchNotes(): void {
        this.notes = this.db.collection<Note>('notes', (ref) => ref.orderBy('added', 'desc')).get();
    }

    distributeAndSortNotes(data: QuerySnapshot<any>): Note[] {
        const active: Note[] = [];
        const archived: Note[] = [];
        data.docs.forEach((doc) => {
            const obj = doc.data();
            const note: Note = {
                id: doc.id,
                text: obj.text,
                added: new Date(obj.added.seconds * 1000),
                archived: obj.archived,
                links: obj.links ? [...obj.links] : null
            };
            if (obj.archived) { archived.push(note); } else { active.push(note); }
        });
        return active.concat(archived);
    }


}
