import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Drink } from '../../models/drink.model';
import { CoffeeStore } from '../../services/coffee-store';

@Component({
  selector: 'app-admin-drinks',
  imports: [],
  templateUrl: './admin-drinks.html',
  styleUrl: './admin-drinks.css',
})
export class AdminDrinks {
  private coffeeStore = inject(CoffeeStore);
  private router = inject(Router);

  drinks: Drink[] = [];
  loading = false;
  errorMessage = '';

  drinkToDelete: {
    id: string;
    name: string;
  } | null = null;

  successMessage = '';

  constructor() {
    this.loadDrinks();
  }
  
  loadDrinks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.coffeeStore
      .getDrinks()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (drinks) => {
          this.drinks = drinks;
        },
        error: () => {
          this.errorMessage = 'Unable to load drinks.';
        },
      });
  }

  addDrink(): void {
    this.router.navigate(['/admin/drinks/new']);
  }

  editDrink(id: string): void {
    this.router.navigate(['/admin/drinks', id, 'edit']);
  }

  confirmDelete(id: string, name: string): void {
    this.drinkToDelete = {
      id,
      name,
    };
  }

  cancelDelete(): void {
    this.drinkToDelete = null;
  }

  deleteDrink(): void {
    if (!this.drinkToDelete) {
      return;
    }

    const { id, name } = this.drinkToDelete;

    this.errorMessage = '';

    this.coffeeStore.deleteDrink(id).subscribe({
      next: () => {
        this.drinkToDelete = null;
        this.successMessage = `✓ ${name} deleted`;

        this.loadDrinks();

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },

      error: () => {
        this.errorMessage =
          "We couldn't delete the drink. Please try again.";
      },
    });
  }
}