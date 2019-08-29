import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Note } from '../interfaces/note';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';

@Injectable({
    providedIn: 'root'
})
export class NotesService {

    public notes: Subject<Note[]>;
    private mockNotes: Note[] = [
        {
            id: '001',
            text: 'This is an old note.',
            links: null,
            archived: false,
            added: new Date(1558640521000)
        },
        {
            id: '002',
            text: 'Key to the main door: 12 # 3452',
            links: null,
            archived: false,
            added: new Date(1562926260000)
        },
        {
            id: '004',
            text: 'Check out these sites:',
            links: [
                { name: 'A cool framework', url: 'https://angular.io' },
                { name: 'Want backend?', url: 'https://firebase.google.com' }
            ],
            archived: false,
            added: new Date(1564411800000)
        },
        {
            id: '005',
            text: '',
            links: [
                { name: 'Wanna watch this movie...', url: 'https://www.imdb.com/title/tt2527338/' }
            ],
            archived: false,
            added: new Date(1564085160000)
        },
        {
            id: '007',
            text: 'This is an archived note.',
            links: null,
            archived: true,
            added: new Date(1565601960000)
        },
        {
            id: '008',
            text: 'Something that is still good keeping but might not be interesting anymore.',
            links: null,
            archived: true,
            added: new Date(1559734380000)
        },
        {
            id: '009',
            text: 'Something more down here from last year :)',
            links: null,
            archived: true,
            added: new Date(1523964720000)
        }
    ];

    constructor(
            public alert: AlertService,
            public spinner: SpinnerService
        ) {
        this.notes = new BehaviorSubject(null);
        this.fetchNotes();
    }

    fetchNotes(): void {
        this.notes.next(this.mockNotes);
    }

    distributeAndSortNotes(data: Note[]): Note[] {
        const active: Note[] = [];
        const archived: Note[] = [];
        this.mockNotes.sort((a: Note, b: Note) => b.added.getTime() - a.added.getTime());
        data.forEach((obj) => {
            const note: Note = {
                id: obj.id,
                text: obj.text,
                added: obj.added,
                archived: obj.archived,
                links: obj.links ? [...obj.links] : null
            };
            if (obj.archived) { archived.push(note); } else { active.push(note); }
        });
        return active.concat(archived);
    }

    addNewNote(note: Note): void {
        this.spinner.show();
        setTimeout(() => {
            if (Math.random() > 0.2) {
                this.mockNotes.push(note);
                this.fetchNotes();
                this.alert.show('Note added successfully.', 'success');
            } else {
                this.alert.show('Error adding note. You were just unlucky, try again!', 'danger');
            }
            this.spinner.hide();
        }, 500);
    }

    deleteNote(id: string): void {
        this.spinner.show();
        setTimeout(() => {
            if (Math.random() > 0.2) {
                this.mockNotes = this.mockNotes.filter(note => note.id !== id);
                this.fetchNotes();
                this.alert.show('Note deleted successfully.', 'success');
            } else {
                this.alert.show('Error deleting note. You were just unlucky, try again!', 'danger');
            }
            this.spinner.hide();
        }, 500);
    }

    archiveNote(id: string, archived: boolean): void {
        this.spinner.show();
        setTimeout(() => {
            if (Math.random() > 0.2) {
                this.mockNotes.forEach(note => {
                    if (note.id === id) {
                        note.archived = !archived;
                    }
                });
                this.fetchNotes();
                this.alert.show('Note updated successfully.', 'success');
            } else {
                this.alert.show('Error updating note. You were just unlucky, try again!', 'danger');
            }
            this.spinner.hide();
        }, 500);
    }

    updateNote(id: string, note: Note): void {
        this.spinner.show();
        setTimeout(() => {
            if (Math.random() > 0.2) {
                this.mockNotes = this.mockNotes.filter(elem => elem.id !== id);
                this.mockNotes.push(note);
                this.fetchNotes();
                this.alert.show('Note updated successfully.', 'success');
            } else {
                this.alert.show('Error updating note. You were just unlucky, try again!', 'danger');
            }
            this.spinner.hide();
        }, 500);
    }
}
