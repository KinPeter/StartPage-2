/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { DevToPost } from '../interfaces/dev-to-post';

@Injectable({
  providedIn: 'root',
})
export class DevToService {
  private apiUrl = 'https://dev.to/api/articles';
  public posts: BehaviorSubject<DevToPost[]>;
  private defaultTag = 'javascript';
  public topOnly = false;

  constructor(
    private http: HttpClient,
    private alert: AlertService,
    private spinner: SpinnerService
  ) {
    this.posts = new BehaviorSubject(null);
    this.fetchPostsByTag(this.defaultTag);
  }

  async fetchPostsByTag(tag?: string): Promise<void> {
    const devToParams: any = { tag };
    if (this.topOnly) {
      devToParams.top = 3;
    }
    this.spinner.show();
    try {
      const newPosts: DevToPost[] = [];
      const response: any = await this.http.get(this.apiUrl, { params: devToParams }).toPromise();
      response.forEach((post: any) => {
        newPosts.push({
          title: post.title,
          published: new Date(post.published_at),
          url: post.url,
          likes: post.positive_reactions_count,
          tagList: [...post.tag_list],
        });
      });
      this.posts.next(newPosts);
    } catch (error) {
      console.log(error);
      this.alert.show('Fetching Dev.to posts failed.', 'danger');
    } finally {
      this.spinner.hide();
    }
  }

  public toggleTopOnly(): void {
    this.topOnly = !this.topOnly;
  }
}
