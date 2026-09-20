import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToppings } from './admin-toppings';

describe('AdminToppings', () => {
  let component: AdminToppings;
  let fixture: ComponentFixture<AdminToppings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminToppings],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminToppings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
