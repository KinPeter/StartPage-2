import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/app/interfaces/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent implements OnInit {
  @Input() noteToUpdate: Note | null;
  @ViewChild('f', { static: true }) noteForm: NgForm;
  @ViewChild('elementRef', { static: true }) eRef: ElementRef;
  @Output() canceling = new EventEmitter<void>();
  closing = false;
  isEditing = false;
  note: Note = {
    text: '',
    added: null,
    archived: false,
    links: [],
  };
  currentLinkName = '';
  currentLinkUrl = '';
  @HostListener('document:click', ['$event']) clickOutside = (): void => {};

  constructor(public noteService: NotesService) {}

  ngOnInit() {
    if (this.noteToUpdate) {
      this.isEditing = true;
      this.note = {
        id: this.noteToUpdate.id,
        text: this.noteToUpdate.text,
        added: this.noteToUpdate.added,
        archived: this.noteToUpdate.archived,
        links: this.noteToUpdate.links ? [...this.noteToUpdate.links] : null,
      };
    }
    setTimeout(() => {
      this.clickOutside = this.onClickOutside;
    }, 500);
  }

  onAddLink(): void {
    if (!this.note.links) {
      this.note.links = [];
    }
    this.note.links.push({ name: this.currentLinkName, url: this.currentLinkUrl });
    this.currentLinkName = '';
    this.currentLinkUrl = '';
  }

  onRemoveLink(index: number, e: MouseEvent): void {
    e.stopPropagation();
    this.note.links.splice(index, 1);
  }

  onSubmit(): void {
    this.note.added = new Date();
    if (!this.note.links) {
      this.note.links = null;
    } else {
      this.note.links = this.note.links.length > 0 ? this.note.links : null;
    }
    if (this.isEditing) {
      this.noteService.updateNote(this.note.id, this.note);
    } else {
      this.noteService.addNewNote(this.note);
    }
    this.closing = true;
    setTimeout(() => {
      this.canceling.emit();
    }, 300);
    this.resetThisNote();
  }

  onCancel(): void {
    this.noteForm.reset();
    this.noteToUpdate = null;
    this.resetThisNote();
    this.isEditing = false;
    this.closing = true;
    setTimeout(() => {
      this.canceling.emit();
    }, 300);
  }

  private resetThisNote(): void {
    this.note = {
      text: '',
      added: null,
      archived: false,
      links: [],
    };
  }

  onClickOutside(): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.onCancel();
    }
  }
}
