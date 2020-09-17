import { Component, OnInit } from '@angular/core';
import { DevToPost } from 'src/app/interfaces/dev-to-post';
import { DevToService } from 'src/app/services/dev-to.service';

@Component({
  selector: 'app-dev-to',
  templateUrl: './dev-to.component.html',
  styleUrls: ['./dev-to.component.scss'],
})
export class DevToComponent implements OnInit {
  public posts: DevToPost[];
  public tags = [
    'javascript',
    'angular',
    'vue',
    'react',
    'typescript',
    'css',
    'webdev',
    'node',
    'tutorial',
    'career',
  ];

  constructor(public devToService: DevToService) {}

  ngOnInit() {
    this.devToService.posts.subscribe(value => {
      this.posts = value;
    });
  }
}
