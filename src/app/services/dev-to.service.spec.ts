import { TestBed } from '@angular/core/testing';

import { DevToService } from './dev-to.service';

describe('DevToService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevToService = TestBed.get(DevToService);
    expect(service).toBeTruthy();
  });
});
