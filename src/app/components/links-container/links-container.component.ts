import { Component, OnInit } from '@angular/core';
import { LinksService } from 'src/app/services/links.service';
import { LinkTagsService } from 'src/app/services/link-tags.service';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Link, Tag } from 'src/app/interfaces/link';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-links-container',
  templateUrl: './links-container.component.html',
  styleUrls: ['./links-container.component.scss'],
})
export class LinksContainerComponent implements OnInit {
  public isOpen: boolean;
  public tagsArray: [string, Tag][];
  public results: Link[];
  public hasResults: boolean;
  public isLoggedIn: boolean;
  public isSearching: boolean;
  public isAdding: boolean;

  constructor(
    public linkService: LinksService,
    public auth: AuthService,
    public lt: LinkTagsService,
    public alert: AlertService,
    public spinner: SpinnerService
  ) {
    this.isOpen = false;
    this.results = [];
    this.hasResults = false;
    this.isSearching = false;
    this.isAdding = false;
  }

  ngOnInit() {
    this.tagsArray = Object.entries(this.lt.tags);
    this.linkService.linkResults.subscribe((result: Link[]) => {
      if (result) {
        this.results = result;
        this.hasResults = true;
      }
    });
    this.auth.loggedIn.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  toggleView(): void {
    this.isOpen = !this.isOpen;
  }

  loadLinksByTag(tag: string): void {
    this.linkService.fetchLinksByTag(tag);
  }

  onAddLink(): void {
    this.isAdding = true;
  }

  onCloseAddLink(): void {
    this.isAdding = false;
  }

  onSearchLink(): void {
    this.linkService.fetchAllLinks();
    this.results = [];
    this.hasResults = false;
    this.linkService.linkResults.next(null);
    this.isSearching = true;
  }

  onCloseSearch(): void {
    this.isSearching = false;
  }

  onCloseResults(): void {
    this.results = [];
    this.hasResults = false;
    this.linkService.linkResults.next(null);
  }
}
