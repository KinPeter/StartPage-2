import { TestBed } from '@angular/core/testing';

import { LinkTagsService } from './link-tags.service';

describe('LinkTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkTagsService = TestBed.get(LinkTagsService);
    expect(service).toBeTruthy();
  });
});
