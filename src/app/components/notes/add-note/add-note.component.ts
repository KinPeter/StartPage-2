import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
    selector: 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

    @ViewChild('f', { static: true }) noteForm: NgForm;

    note: Note = {
        text: '',
        added: null,
        archived: false,
        links: []
    };
    currentLinkName: string;
    currentLinkUrl: string;

    constructor( public noteService: NotesService ) {

    }

    ngOnInit() {
    }


    onAddLink(): void {
        this.note.links.push({name: this.currentLinkName, url: this.currentLinkUrl});
        this.currentLinkName = '';
        this.currentLinkUrl = '';
        console.log(this.note.links);
    }

    onSubmit(): void {
        this.note.text = this.noteForm.value.text;
        this.note.added = new Date();
        this.note.links = this.note.links.length > 0 ? this.note.links : null;
        this.noteForm.reset();
        console.log(this.note);
        this.noteService.addNewNote(this.note);
    }

}
