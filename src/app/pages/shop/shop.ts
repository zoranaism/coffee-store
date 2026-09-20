import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoffeeStore } from '../../services/coffee-store';
import { Drink } from '../../models/drink.model';
import { Topping } from '../../models/topping.model';
import { CartState } from '../../services/cart-state';
import { RouterLink } from '@angular/router';
import { Button } from '../../shared/button/button';

@Component({
  selector: 'app-shop',
  imports: [AsyncPipe, RouterLink, Button],  
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  private coffeeStore = inject(CoffeeStore);
  private cartState = inject(CartState);

  drinks = this.coffeeStore.getDrinks();
  toppings = this.coffeeStore.getToppings();

  selectedDrink: Drink | null = null;
  selectedToppings: Topping[] = [];

  successMessage = '';
  errorMessage = '';

  selectDrink(drink: Drink): void {
    this.selectedDrink = drink;
    this.selectedToppings = [];
    this.successMessage = '';
    this.errorMessage = '';
  }

  toggleTopping(topping: Topping): void {
    const alreadySelected = this.selectedToppings.some(
      (item) => item.id === topping.id
    );

    if (alreadySelected) {
      this.selectedToppings = this.selectedToppings.filter(
        (item) => item.id !== topping.id
      );
    } else {
      this.selectedToppings = [
        ...this.selectedToppings,
        topping,
      ];
    }

    this.successMessage = '';
    this.errorMessage = '';
  }

  addToCart(): void {
    if (!this.selectedDrink) return;

    this.successMessage = '';
    this.errorMessage = '';

    this.coffeeStore
      .addToCart(
        this.selectedDrink.id,
        this.selectedToppings.map((topping) => topping.id)
      )
      .subscribe({
        next: (cart) => {
          this.cartState.setCart(cart);

          const toppingText =
            this.selectedToppings.length > 0
              ? ` with ${this.selectedToppings.map((topping) => topping.name).join(', ')}`
              : '';

          this.successMessage =
            `${this.selectedDrink?.name}${toppingText} added to your cart.`;
        },

        error: () => {
          this.errorMessage =
            "We couldn't add this item to your cart. Please try again.";
        },
      });
  }
}