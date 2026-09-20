import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartState } from '../../services/cart-state';
import { CoffeeStore } from '../../services/coffee-store';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private router = inject(Router);
  private coffeeStore = inject(CoffeeStore);

  protected cartState = inject(CartState);

  orderPlaced = false;
  orderId = '';
  orderTotal = 0;
  errorMessage = '';

  placeOrder(): void {
    const cart = this.cartState.cart();

    if (!cart) {
      return;
    }

    this.errorMessage = '';

    this.coffeeStore.createOrder(cart.id).subscribe({
      next: (order) => {
        this.orderPlaced = true;
        this.orderId = order.id;
        this.orderTotal = order.total;

        this.cartState.clear();
      },

      error: () => {
        this.errorMessage =
          "We couldn't place your order. Your cart has not been cleared. Please try again.";
      },
    });
  }

  retryOrder(): void {
    this.placeOrder();
  }

  continueShopping(): void {
    this.router.navigate(['/shop']);
  }
}