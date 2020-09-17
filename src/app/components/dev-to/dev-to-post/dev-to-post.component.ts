import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DevToPost } from 'src/app/interfaces/dev-to-post';

@Component({
  selector: 'app-dev-to-post',
  templateUrl: './dev-to-post.component.html',
  styleUrls: ['./dev-to-post.component.scss'],
})
export class DevToPostComponent implements OnInit {
  @Input() post: DevToPost;
  @Output() tagClicked = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onTagClick(tag: string): void {
    this.tagClicked.emit(tag);
  }
}
