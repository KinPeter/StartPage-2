import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { Link } from '../interfaces/link';
import { AngularFirestore, QuerySnapshot, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { LinkTagsService } from './link-tags.service';

@Injectable({
    providedIn: 'root'
})
export class LinksService {

    public linksCollection = this.db.collection<Link>('links');
    public links: BehaviorSubject<Link[]>;
    public linksSubscription: Subscription;
    public linkResults: Subject<Link[]>;

    constructor(
        public db: AngularFirestore,
        public alert: AlertService,
        public spinner: SpinnerService,
        public lt: LinkTagsService
    ) {
        this.links = new BehaviorSubject([]);
        this.linkResults = new Subject();
        this.fetchAllLinks();
    }

    async fetchAllLinks(): Promise<void> {
        const localLinks = sessionStorage.getItem('localLinks');
        if (!localLinks) {
            this.spinner.show();
            let data: QuerySnapshot<any>;
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

    fetchLinksByTag(tag: string): void {
        this.spinner.show();
        let results: Link[];
        setTimeout(() => {
            results = this.links.value.filter((link) => link.tags.includes(tag));
            results.sort((a: Link, b: Link) => this.sortByName(a, b));
            this.linkResults.next(results);
            this.spinner.hide();
        }, 500);
    }

    addNewLink(link: Link): void {
        this.spinner.show();
        setTimeout(() => {
            if (Math.random() > 0.2) {
                this.links.next([...this.links.value, link]);
                this.alert.show('Link added successfully.', 'success');
                sessionStorage.setItem('localLinks', JSON.stringify(this.links.value));
            } else {
                this.alert.show('Error adding link. You were just unlucky, try again! ', 'danger');
            }
            this.spinner.hide();
        }, 500);
    }

    searchLink(text: string): void {
        if (this.linksSubscription) {
            this.linksSubscription.unsubscribe();
        }
        this.linkResults.next(null);
        const results: Link[] = [];
        this.linksSubscription = this.links.subscribe((links) => {
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

    transformData(data: QuerySnapshot<any>): Link[] {
        const links: Link[] = [];
        data.docs.forEach((doc) => {
            const obj = doc.data();
            const currentLink: Link = {
                id: doc.id,
                name: obj.name,
                url: obj.url,
                tags: obj.tags
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
