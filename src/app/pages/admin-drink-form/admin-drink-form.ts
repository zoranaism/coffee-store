import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeStore } from '../../services/coffee-store';

@Component({
  selector: 'app-admin-drink-form',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-drink-form.html',
  styleUrl: './admin-drink-form.css',
})
export class AdminDrinkForm {
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private coffeeStore = inject(CoffeeStore);

  form = this.formBuilder.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
      ],
    ],

    price: [
      0,
      [
        Validators.required,
        Validators.min(0.01),
      ],
    ],
  });

  isEditMode = false;
  drinkId = '';
  errorMessage = '';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.drinkId = id;

      this.loadDrink(id);
    }
  }

  private loadDrink(id: string): void {
    this.coffeeStore.getDrinks().subscribe((drinks) => {
      const drink = drinks.find((item) => item.id === id);

      if (!drink) {
        this.router.navigate(['/admin/drinks']);
        return;
      }

      this.form.patchValue({
        name: drink.name,
        price: drink.price,
      });
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';

    const drink = this.form.getRawValue();

    if (this.isEditMode) {
      this.coffeeStore
        .updateDrink(this.drinkId, drink)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/drinks']);
          },
          error: () => {
            this.errorMessage =
              "We couldn't save the drink. Please try again.";
          },
        });
    } else {
      this.coffeeStore
        .createDrink(drink)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/drinks']);
          },
          error: () => {
            this.errorMessage =
              "We couldn't save the drink. Please try again.";
          },
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/drinks']);
  }
}