import { TestBed } from '@angular/core/testing';

import { CoffeeStore } from './coffee-store';

describe('CoffeeStore', () => {
  let service: CoffeeStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
