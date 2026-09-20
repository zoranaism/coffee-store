import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CoffeeStore } from '../../services/coffee-store';
import { Drink } from '../../models/drink.model';
import { Topping } from '../../models/topping.model';
import { CartState } from '../../services/cart-state';

@Component({
  selector: 'app-shop',
  imports: [AsyncPipe],
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

  selectDrink(drink: Drink): void {
    this.selectedDrink = drink;
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
  }

  addToCart(): void {
    if (!this.selectedDrink) {
      return;
    }

    this.coffeeStore
      .addToCart(
        this.selectedDrink.id,
        this.selectedToppings.map((topping) => topping.id)
      )
      .subscribe({
        next: (cart) => {
          this.cartState.setCart(cart);
        },
      });
  }
}