import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdminToppingForm } from './admin-topping-form';
import { CoffeeStore } from '../../services/coffee-store';

describe('AdminToppingForm', () => {
  let component: AdminToppingForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminToppingForm],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
          },
        },
        {
          provide: CoffeeStore,
          useValue: {
            getToppings: () => of([]),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AdminToppingForm);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});