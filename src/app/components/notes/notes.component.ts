import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/interfaces/note';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  public notes: Note[];
  public noteToEdit: Note;
  public isLoggedIn: boolean;
  public addingNote: boolean;

  constructor(
    public notesService: NotesService,
    public auth: AuthService,
    public spinner: SpinnerService,
    public alert: AlertService
  ) {
    this.notes = [];
    this.noteToEdit = null;
    this.addingNote = false;
  }

  ngOnInit() {
    this.spinner.show();
    this.notesService.notes.subscribe(
      response => {
        this.spinner.hide();
        this.notes = this.notesService.distributeAndSortNotes(response);
      },
      error => {
        this.spinner.hide();
        this.alert.show('Fetch of notes failed. ' + error.message, 'danger');
        console.log(error);
      }
    );
    this.auth.loggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  onAddNote(): void {
    this.noteToEdit = null;
    this.addingNote = true;
  }

  onCancel(): void {
    this.addingNote = false;
  }

  onEditNote(note: Note): void {
    this.noteToEdit = note;
    this.addingNote = true;
  }
}
