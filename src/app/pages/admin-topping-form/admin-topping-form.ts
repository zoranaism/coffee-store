import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeStore } from '../../services/coffee-store';

@Component({
  selector: 'app-admin-topping-form',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-topping-form.html',
  styleUrl: './admin-topping-form.css',
})
export class AdminToppingForm {
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
  toppingId = '';
  errorMessage = '';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.toppingId = id;

      this.loadTopping(id);
    }
  }

  private loadTopping(id: string): void {
    this.coffeeStore.getToppings().subscribe((toppings) => {
      const topping = toppings.find(
        (item) => item.id === id
      );

      if (!topping) {
        this.router.navigate(['/admin/toppings']);
        return;
      }

      this.form.patchValue({
        name: topping.name,
        price: topping.price,
      });
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.errorMessage = '';

    const topping = this.form.getRawValue();

    if (this.isEditMode) {
      this.coffeeStore
        .updateTopping(this.toppingId, topping)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/toppings']);
          },
          error: () => {
            this.errorMessage =
              "We couldn't save the topping. Please try again.";
          },
        });
    } else {
      this.coffeeStore
        .createTopping(topping)
        .subscribe({
          next: () => {
            this.router.navigate(['/admin/toppings']);
          },
          error: () => {
            this.errorMessage =
              "We couldn't save the topping. Please try again.";
          },
        });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/toppings']);
  }
}