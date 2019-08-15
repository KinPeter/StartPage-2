import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/interfaces/note';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

    public notes: Note[];

    constructor(
        public notesService: NotesService,
        public spinner: SpinnerService,
        public alert: AlertService
    ) {
        this.notes = [];
    }

    ngOnInit() {
        this.spinner.show();
        this.notesService.notes.subscribe((response) => {
            this.spinner.hide();
            this.notes = this.notesService.distributeAndSortNotes(response);
            console.log(this.notes);
        },
        (error: any) => {
            this.spinner.hide();
            this.alert.show('Fetch of notes failed. ' + error.message, 'danger');
            console.log(error);
        });
    }

}
