import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDrinks } from './admin-drinks';

describe('AdminDrinks', () => {
  let component: AdminDrinks;
  let fixture: ComponentFixture<AdminDrinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDrinks],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDrinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
