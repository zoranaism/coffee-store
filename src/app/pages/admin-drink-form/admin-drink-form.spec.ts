import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdminDrinkForm } from './admin-drink-form';
import { CoffeeStore } from '../../services/coffee-store';

describe('AdminDrinkForm', () => {
  let component: AdminDrinkForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AdminDrinkForm],
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
            getDrinks: () => of([]),
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(AdminDrinkForm);
    component = fixture.componentInstance;
  });

  it('should reject a negative price', () => {
    component.form.controls.price.setValue(-5);

    expect(component.form.invalid).toBe(true);
    expect(component.form.controls.price.invalid).toBe(true);
  });
});