import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Topping } from '../../models/topping.model';
import { CoffeeStore } from '../../services/coffee-store';

@Component({
  selector: 'app-admin-toppings',
  imports: [],
  templateUrl: './admin-toppings.html',
  styleUrl: './admin-toppings.css',
})
export class AdminToppings {
  private coffeeStore = inject(CoffeeStore);
  private router = inject(Router);

  toppings: Topping[] = [];
  loading = false;
  errorMessage = '';

  toppingToDelete: {
    id: string;
    name: string;
  } | null = null;

  successMessage = '';

  constructor() {
    this.loadToppings();
  }

  loadToppings(): void {
    this.loading = true;
    this.errorMessage = '';

    this.coffeeStore
      .getToppings()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (toppings) => {
          this.toppings = toppings;
        },
        error: () => {
          this.errorMessage = 'Unable to load toppings.';
        },
      });
  }

  addTopping(): void {
    this.router.navigate(['/admin/toppings/new']);
  }

  editTopping(id: string): void {
    this.router.navigate(['/admin/toppings', id, 'edit']);
  }

  confirmDelete(id: string, name: string): void {
    this.toppingToDelete = {
      id,
      name,
    };
  }

  cancelDelete(): void {
    this.toppingToDelete = null;
  }

  deleteTopping(): void {
    if (!this.toppingToDelete) {
      return;
    }

    const { id, name } = this.toppingToDelete;

    this.errorMessage = '';

    this.coffeeStore.deleteTopping(id).subscribe({
      next: () => {
        this.toppingToDelete = null;
        this.successMessage = `✓ ${name} deleted`;

        this.loadToppings();

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },

      error: () => {
        this.errorMessage =
          "We couldn't delete the topping. Please try again.";
      },
    });
  }
}