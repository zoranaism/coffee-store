import { Component, inject } from '@angular/core';
import { CartState } from '../../services/cart-state';
import { CoffeeStore } from '../../services/coffee-store';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  protected cartState = inject(CartState);
  private coffeeStore = inject(CoffeeStore);

  errorMessage = '';
  lastAction: (() => void) | null = null;

  increaseQuantity(itemId: string, currentQuantity: number): void {
    this.lastAction = () =>
      this.increaseQuantity(itemId, currentQuantity);

    this.errorMessage = '';

    this.coffeeStore
      .updateCartItem(itemId, currentQuantity + 1)
      .subscribe({
        next: (cart) => {
          this.cartState.setCart(cart);
        },
        error: () => {
          this.errorMessage = "We couldn't update your cart.";
        },
      });
  }

  decreaseQuantity(itemId: string, currentQuantity: number): void {
    if (currentQuantity <= 1) {
      return;
    }

    this.lastAction = () =>
      this.decreaseQuantity(itemId, currentQuantity);

    this.errorMessage = '';

    this.coffeeStore
      .updateCartItem(itemId, currentQuantity - 1)
      .subscribe({
        next: (cart) => {
          this.cartState.setCart(cart);
        },
        error: () => {
          this.errorMessage = "We couldn't update your cart.";
        },
      });
  }

  removeItem(itemId: string): void {
    this.lastAction = () => this.removeItem(itemId);

    this.errorMessage = '';

    this.coffeeStore.deleteCartItem(itemId).subscribe({
      next: (cart) => {
        this.cartState.setCart(cart);
      },
      error: () => {
        this.errorMessage = "We couldn't update your cart.";
      },
    });
  }

  retryLastAction(): void {
    if (this.lastAction) {
      this.lastAction();
    }
  }
}