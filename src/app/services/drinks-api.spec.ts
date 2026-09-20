import { TestBed } from '@angular/core/testing';

import { DrinksApi } from './drinks-api';

describe('DrinksApi', () => {
  let service: DrinksApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinksApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
