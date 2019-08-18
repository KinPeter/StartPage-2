import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Link } from '../interfaces/link';
import { AngularFirestore, QuerySnapshot } from '@angular/fire/firestore';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { LinkTagsService } from './link-tags.service';

@Injectable({
    providedIn: 'root'
})
export class LinksService {

    public linksCollection = this.db.collection<Link>('links');
    public links: Subject<Link[]>;
    public linkResults: Subject<Link[]>;

    constructor(
        public db: AngularFirestore,
        public alert: AlertService,
        public spinner: SpinnerService,
        public lt: LinkTagsService
    ) {
        this.links = new Subject();
        this.linkResults = new Subject();
    }

    fetchAllLinks(): void {
        const localLinks = sessionStorage.getItem('localLinks');
        if (!localLinks) {
            this.spinner.show();
            this.linksCollection.get()
            .toPromise()
            .then((data: QuerySnapshot<any>) => {
                if (data.empty) {
                    this.links.error(new Error('No links found.'));
                } else {
                    const linksArray = this.transformData(data);
                    this.links.next(linksArray);
                    sessionStorage.setItem('localLinks', JSON.stringify(linksArray));
                }
            })
            .catch((error) => {
                this.links.error(error);
                this.alert.show('Unable to fetch links.', 'danger');
            })
            .finally(() => {
                this.spinner.hide();
            });
        } else {
            this.links.next(JSON.parse(localLinks));
        }
    }

    fetchLinksByTag(tag: string): void {
        this.spinner.show();
        this.db.collection<Link>('links', (ref) => ref.where('tags', 'array-contains', tag))
        .get()
        .toPromise()
        .then((data: QuerySnapshot<any>) => {
            if (data.empty) {
                this.linkResults.error(new Error('No links found.'));
            } else {
                const linksArray = this.transformData(data);
                this.linkResults.next(linksArray);
            }
        })
        .catch((error) => {
            this.linkResults.error(error);
            this.alert.show('Unable to fetch links.', 'danger');
        })
        .finally(() => {
            this.spinner.hide();
        });
    }

    searchLink(text: string): void {
        const results: Link[] = [];
        const subscription = this.links.subscribe((links) => {
            links.forEach((link: Link) => {
                if (link.name.toLowerCase().includes(text.trim().toLowerCase())) {
                    results.push(link);
                }
            });
            this.linkResults.next(results);
            subscription.unsubscribe();
            console.log('LinkService - Search results: ', results);
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
}
