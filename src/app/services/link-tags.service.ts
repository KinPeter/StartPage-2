import { Injectable } from '@angular/core';
import { Tag } from '../interfaces/link';

@Injectable({
  providedIn: 'root',
})
export class LinkTagsService {
  public tags: { [tag: string]: Tag } = {
    angular: {
      tag: 'angular',
      name: 'Angular',
    },
    api: {
      tag: 'api',
      name: 'API',
    },
    css: {
      tag: 'css',
      name: 'CSS',
    },
    design: {
      tag: 'design',
      name: 'Design',
    },
    docs: {
      tag: 'docs',
      name: 'Docs',
    },
    editors: {
      tag: 'editors',
      name: 'Editors',
    },
    frameworks: {
      tag: 'frameworks',
      name: 'Frameworks',
    },
    html: {
      tag: 'html',
      name: 'HTML',
    },
    javascript: {
      tag: 'javascript',
      name: 'JavaScript',
    },
    linux: {
      tag: 'linux',
      name: 'Linux',
    },
    node: {
      tag: 'node',
      name: 'Node.js',
    },
    onlinecourses: {
      tag: 'onlinecourses',
      name: 'Online courses',
    },
    onlinetools: {
      tag: 'onlinetools',
      name: 'Online tools',
    },
    package: {
      tag: 'package',
      name: 'Package',
    },
    python: {
      tag: 'python',
      name: 'Python',
    },
    react: {
      tag: 'react',
      name: 'React',
    },
    regex: {
      tag: 'regex',
      name: 'RegEx',
    },
    resources: {
      tag: 'resources',
      name: 'Resources',
    },
    security: {
      tag: 'security',
      name: 'Security',
    },
    sql: {
      tag: 'sql',
      name: 'SQL',
    },
    tools: {
      tag: 'tools',
      name: 'Tools',
    },
    tutorials: {
      tag: 'tutorials',
      name: 'Tutorials',
    },
    typescript: {
      tag: 'typescript',
      name: 'TypeScript',
    },
    vue: {
      tag: 'vue',
      name: 'Vue.js',
    },
  };

  constructor() {}
}
