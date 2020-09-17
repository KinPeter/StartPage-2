import { Injectable } from '@angular/core';
import { AngularFirestore, QuerySnapshot, CollectionReference } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Note } from '../interfaces/note';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public notesCollection = this.db.collection<Note>('notes');
  public notes: Subject<QuerySnapshot<unknown>>;

  constructor(
    public db: AngularFirestore,
    public alert: AlertService,
    public spinner: SpinnerService
  ) {
    this.notes = new Subject();
    this.fetchNotes();
  }

  async fetchNotes(): Promise<void> {
    let data: QuerySnapshot<unknown>;
    const query = (ref: CollectionReference) => ref.orderBy('added', 'desc');
    try {
      data = await this.db.collection<Note>('notes', query).get().toPromise();
      if (data.empty) {
        this.notes.error(new Error('No notes found.'));
      } else {
        this.notes.next(data);
      }
    } catch (error) {
      this.notes.error(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  distributeAndSortNotes(data: QuerySnapshot<any>): Note[] {
    const active: Note[] = [];
    const archived: Note[] = [];
    data.docs.forEach(doc => {
      const obj = doc.data();
      const note: Note = {
        id: doc.id,
        text: obj.text,
        added: new Date(obj.added.seconds * 1000),
        archived: obj.archived,
        links: obj.links ? [...obj.links] : null,
      };
      if (obj.archived) {
        archived.push(note);
      } else {
        active.push(note);
      }
    });
    return active.concat(archived);
  }

  async addNewNote(note: Note): Promise<void> {
    this.spinner.show();
    try {
      await this.notesCollection.add(note);
      this.alert.show('Note added successfully.', 'success');
      await this.fetchNotes();
    } catch (error) {
      console.log(error);
      this.alert.show('Error adding note. ' + error.message, 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  async deleteNote(id: string): Promise<void> {
    this.spinner.show();
    try {
      await this.notesCollection.doc(id).delete();
      this.alert.show('Note deleted successfully.', 'success');
      await this.fetchNotes();
    } catch (error) {
      console.log(error);
      this.alert.show('Error deleting note. ' + error.message, 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  async archiveNote(id: string, archived: boolean): Promise<void> {
    this.spinner.show();
    try {
      await this.notesCollection.doc(id).update({
        archived: !archived,
      });
      this.alert.show('Note updated successfully.', 'success');
      await this.fetchNotes();
    } catch (error) {
      console.log(error);
      this.alert.show('Error updating note. ' + error.message, 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  async updateNote(id: string, note: Note): Promise<void> {
    this.spinner.show();
    delete note.id;
    try {
      await this.notesCollection.doc(id).set({
        ...note,
      });
      this.alert.show('Note updated successfully.', 'success');
      await this.fetchNotes();
    } catch (error) {
      console.log(error);
      this.alert.show('Error updating note. ' + error.message, 'danger');
    } finally {
      this.spinner.hide();
    }
  }
}
