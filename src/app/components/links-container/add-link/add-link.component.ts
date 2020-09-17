import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { NgForm } from '@angular/forms';
import { Link, Tag } from 'src/app/interfaces/link';
import { LinkTagsService } from 'src/app/services/link-tags.service';

@Component({
  selector: 'app-add-link',
  templateUrl: './add-link.component.html',
  styleUrls: ['./add-link.component.scss'],
})
export class AddLinkComponent implements OnInit, AfterViewInit {
  public closing = false;
  public tags: { [tag: string]: Tag };
  public tagsArray: [string, Tag][];
  public link: Link;
  @Output() closeAddLink = new EventEmitter<void>();
  @ViewChild('f', { static: true }) searchForm: NgForm;
  @ViewChild('linkNameInput', { static: true }) linkNameInput: ElementRef;
  @ViewChild('elementRef', { static: true }) eRef: ElementRef;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @HostListener('document:click', ['$event']) clickOutside = (event: MouseEvent): void => {};

  constructor(public linkService: LinksService, public lt: LinkTagsService) {
    this.link = {
      name: '',
      url: '',
      tags: [],
    };
    this.tags = this.lt.tags;
    this.tagsArray = Object.entries(this.lt.tags);
  }

  ngOnInit() {
    setTimeout(() => {
      this.clickOutside = this.onClickOutside;
    }, 500);
  }

  ngAfterViewInit() {
    this.linkNameInput.nativeElement.focus();
  }

  toggleTag(tag: string): void {
    if (!this.link.tags.includes(tag)) {
      this.link.tags.push(tag);
    } else {
      const index = this.link.tags.indexOf(tag);
      this.link.tags.splice(index, 1);
    }
  }

  isTagAdded(tag: string): boolean {
    return this.link.tags.includes(tag);
  }

  onSubmit(): void {
    console.log(this.link);
    this.linkService.addNewLink(this.link);
    this.onCloseAddLink();
  }

  onCloseAddLink(): void {
    this.closing = true;
    setTimeout(() => {
      this.closeAddLink.emit();
    }, 300);
  }

  onClickOutside(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.onCloseAddLink();
    }
  }
}
