import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  @Output() noteToEdit = new EventEmitter<Note>(null);
  isLoggedIn: boolean;
  isConfirmingDeletion: boolean;

  constructor(public noteService: NotesService, public auth: AuthService) {}

  ngOnInit() {
    this.auth.loggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  editNote(): void {
    this.noteToEdit.emit(this.note);
  }

  archiveNote(): void {
    this.noteService.archiveNote(this.note.id, this.note.archived);
  }

  onDeleteClicked(): void {
    this.isConfirmingDeletion = !this.isConfirmingDeletion;
  }

  onConfirmDelete(): void {
    this.deleteNote();
    this.isConfirmingDeletion = false;
  }

  onCancelDelete(): void {
    this.isConfirmingDeletion = false;
  }

  deleteNote(): void {
    this.noteService.deleteNote(this.note.id);
  }
}
