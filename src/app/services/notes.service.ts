import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, QueryDocumentSnapshot, DocumentReference } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { Note } from '../interfaces/note';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    public notesCollection = this.db.collection<Note>('notes');
    public notes: Subject<QuerySnapshot<any>>;

    constructor(
            public db: AngularFirestore,
            public alert: AlertService,
            public spinner: SpinnerService
        ) {
        this.notes = new Subject();
        this.fetchNotes();
    }

    fetchNotes(): void {
        this.db.collection<Note>('notes', (ref) => ref.orderBy('added', 'desc')).get()
        .toPromise()
        .then((data: QuerySnapshot<any>) => {
            if (data.empty) {
                this.notes.error(new Error('No notes found.'));
            } else {
                this.notes.next(data);
            }
        })
        .catch((error) => {
            this.notes.error(error);
        });
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

    addNewNote(note: Note): void {
        this.spinner.show();
        this.notesCollection.add(note)
        .then((response: DocumentReference) => {
            this.alert.show('Note added successfully.', 'success');
            this.fetchNotes();
        })
        .catch((error) => {
            console.log(error);
            this.alert.show('Error adding note. ' + error.message, 'danger');
        })
        .finally(() => {
            this.spinner.hide();
        });
    }

    deleteNote(id: string): void {
        this.spinner.show();
        this.notesCollection.doc(id).delete()
        .then(() => {
            this.alert.show('Note deleted successfully.', 'success');
            this.fetchNotes();
        })
        .catch((error) => {
            console.log(error);
            this.alert.show('Error deleting note. ' + error.message, 'danger');
        })
        .finally(() => {
            this.spinner.hide();
        });
    }

    archiveNote(id: string, archived: boolean): void {
        this.spinner.show();
        this.notesCollection.doc(id).update({
            archived: !archived
        })
        .then(() => {
            this.alert.show('Note updated successfully.', 'success');
            this.fetchNotes();
        })
        .catch((error) => {
            console.log(error);
            this.alert.show('Error updating note. ' + error.message, 'danger');
        })
        .finally(() => {
            this.spinner.hide();
        });
    }

    updateNote(id: string, note: Note): void {
        this.spinner.show();
        delete note.id;
        this.notesCollection.doc(id).set({
            ...note
        })
        .then(() => {
            this.alert.show('Note updated successfully.', 'success');
            this.fetchNotes();
        })
        .catch((error) => {
            console.log(error);
            this.alert.show('Error updating note. ' + error.message, 'danger');
        })
        .finally(() => {
            this.spinner.hide();
        });
    }
}
