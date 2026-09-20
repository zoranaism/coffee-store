import { Injectable, computed, signal } from '@angular/core';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartState {
  private cartSignal = signal<Cart | null>(null);

  readonly cart = this.cartSignal.asReadonly();

  readonly itemCount = computed(() =>
    this.cart()?.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    ) ?? 0
  );

  setCart(cart: Cart): void {
    this.cartSignal.set(cart);
  }

  clear(): void {
    this.cartSignal.set(null);
  }
}