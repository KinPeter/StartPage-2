import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-note',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

    @Input() note: Note;
    isLoggedIn: boolean;

    constructor(
        public noteService: NotesService,
        public auth: AuthService
    ) {

    }

    ngOnInit() {
        this.auth.loggedIn.subscribe((value) => {
            this.isLoggedIn = value;
        });
    }

    editNote(): void {

    }

    archiveNote(): void {
        this.noteService.archiveNote(this.note.id, this.note.archived);
    }

    deleteNote(): void {
        this.noteService.deleteNote(this.note.id);
    }

}
