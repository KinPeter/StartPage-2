import { Component, OnInit, Input } from '@angular/core';
import { Link } from 'src/app/interfaces/link';
import { LinkTagsService } from 'src/app/services/link-tags.service';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.scss'],
})
export class LinkItemComponent implements OnInit {
  @Input() link: Link;

  constructor(public lt: LinkTagsService) {}

  ngOnInit() {}

  getTagName(tag: string): string {
    return this.lt.tags[tag].name;
  }
}
