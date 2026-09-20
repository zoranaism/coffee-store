import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Shop } from './shop';
import { CoffeeStore } from '../../services/coffee-store';

describe('Shop', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shop],
      providers: [
        {
          provide: CoffeeStore,
          useValue: {
            getDrinks: () => of([]),
            getToppings: () => of([]),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(Shop);
    const shop = fixture.componentInstance;

    expect(shop).toBeTruthy();
  });
});