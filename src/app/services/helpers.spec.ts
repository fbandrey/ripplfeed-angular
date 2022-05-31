import { TestBed, inject } from '@angular/core/testing';

import { Helpers } from './helpers';

describe('Helpers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Helpers]
    });
  });

  it('should be created', inject([Helpers], (service: Helpers) => {
    expect(service).toBeTruthy();
  }));
});
