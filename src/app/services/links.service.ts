import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Link } from '../interfaces/link';
import { AngularFirestore, QuerySnapshot, CollectionReference } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  public linksCollection = this.db.collection<Link>('links');
  public links: BehaviorSubject<Link[]>;
  public linksSubscription: Subscription;
  public linkResults: Subject<Link[]>;

  constructor(
    public db: AngularFirestore,
    public alert: AlertService,
    public spinner: SpinnerService
  ) {
    this.links = new BehaviorSubject([]);
    this.linkResults = new Subject();
  }

  async fetchAllLinks(): Promise<void> {
    const localLinks = sessionStorage.getItem('localLinks');
    if (!localLinks) {
      this.spinner.show();
      let data: QuerySnapshot<unknown>;
      try {
        data = await this.linksCollection.get().toPromise();
        if (data.empty) {
          this.links.error(new Error('No links found.'));
        } else {
          const linksArray = this.transformData(data);
          this.links.next(linksArray);
          sessionStorage.setItem('localLinks', JSON.stringify(linksArray));
        }
      } catch (error) {
        console.log(error);
        this.links.error(error);
        this.alert.show('Unable to fetch links.', 'danger');
      } finally {
        this.spinner.hide();
      }
    } else if (!this.links.value.length) {
      // only push links if they are not there already
      // thus avoid triggering subscribers
      this.links.next(JSON.parse(localLinks));
    }
    // clear results subject
    this.linkResults.next(null);
  }

  async forceFetchAllLinks(): Promise<void> {
    if (sessionStorage.getItem('localLinks')) {
      sessionStorage.removeItem('localLinks');
    }
    this.linkResults.next(null);
    this.links.next(null);
    this.spinner.show();
    let data: QuerySnapshot<unknown>;
    try {
      data = await this.linksCollection.get().toPromise();
      if (data.empty) {
        this.links.error(new Error('No links found.'));
      } else {
        const linksArray = this.transformData(data);
        this.links.next(linksArray);
        sessionStorage.setItem('localLinks', JSON.stringify(linksArray));
      }
    } catch (error) {
      console.log(error);
      this.links.error(error);
      this.alert.show('Unable to fetch links.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  async fetchLinksByTag(tag: string): Promise<void> {
    this.spinner.show();
    const query = (ref: CollectionReference) =>
      ref.where('tags', 'array-contains', tag).orderBy('name', 'asc');
    let data: QuerySnapshot<unknown>;
    try {
      data = await this.db.collection<Link>('links', query).get().toPromise();
      if (data.empty) {
        this.linkResults.error(new Error('No links found.'));
      } else {
        const linksArray = this.transformData(data);
        this.linkResults.next(linksArray);
      }
    } catch (error) {
      console.log(error);
      this.linkResults.error(error);
      this.alert.show('Unable to fetch links.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  async addNewLink(link: Link): Promise<void> {
    this.spinner.show();
    try {
      await this.linksCollection.add(link);
      this.alert.show('Link added successfully.', 'success');
      await this.forceFetchAllLinks();
    } catch (error) {
      console.log(error);
      this.alert.show('Error adding link. ' + error.message, 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  searchLink(text: string): void {
    if (this.linksSubscription) {
      this.linksSubscription.unsubscribe();
    }
    this.linkResults.next(null);
    const results: Link[] = [];
    this.linksSubscription = this.links.subscribe(links => {
      links.forEach((link: Link) => {
        if (link.name.toLowerCase().includes(text.trim().toLowerCase())) {
          results.push(link);
        }
      });
      results.sort(this.sortByName);
      if (results.length === 0) {
        this.alert.show('Sorry, no matches.', 'danger');
      } else {
        this.linkResults.next(results);
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transformData(data: QuerySnapshot<any>): Link[] {
    const links: Link[] = [];
    data.docs.forEach(doc => {
      const obj = doc.data();
      const currentLink: Link = {
        id: doc.id,
        name: obj.name,
        url: obj.url,
        tags: obj.tags,
      };
      links.push(currentLink);
    });
    return links;
  }

  sortByName(a: Link, b: Link): number {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
}
