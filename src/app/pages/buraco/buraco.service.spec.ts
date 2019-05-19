import { TestBed } from '@angular/core/testing';

import { BuracoService } from './buraco.service';

describe('BuracoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuracoService = TestBed.get(BuracoService);
    expect(service).toBeTruthy();
  });
});
