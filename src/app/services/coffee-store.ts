import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Drink } from '../models/drink.model';
import { Topping } from '../models/topping.model';
import { drinks, toppings } from '../mock/mock-data';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CoffeeStore {
  private http = inject(HttpClient);

  // --------------------
  // DRINKS
  // --------------------

  getDrinks() {
    return this.http.get<Drink[]>('/api/drinks');
  }

  createDrink(drink: Omit<Drink, 'id'>) {
    return this.http.post<Drink>(
      '/api/drinks',
      drink
    );
  }

  updateDrink(
    id: string,
    drink: Omit<Drink, 'id'>
  ) {
    return this.http.put<Drink>(
      `/api/drinks/${id}`,
      drink
    );
  }

  deleteDrink(id: string) {
    return this.http.delete<void>(`/api/drinks/${id}`);
  }

  // --------------------
  // TOPPINGS
  // --------------------

  getToppings() {
    return this.http.get<Topping[]>('/api/toppings');
  }

  createTopping(topping: Omit<Topping, 'id'>) {
    return this.http.post<Topping>(
      '/api/toppings',
      topping
    );
  }

  updateTopping(
    id: string,
    topping: Omit<Topping, 'id'>
  ) {
    return this.http.put<Topping>(
      `/api/toppings/${id}`,
      topping
    );
  }

  deleteTopping(id: string) {
    return this.http.delete<void>(`/api/toppings/${id}`);
  }

  // --------------------
  // CART
  // --------------------

  getCart() {
    return this.http.get<Cart>('/api/cart/demo-cart');
  }

  addToCart(drinkId: string, toppingIds: string[]) {
    return this.http.post<Cart>(
      '/api/cart/demo-cart/items',
      {
        drinkId,
        toppingIds,
      }
    );
  }

  updateCartItem(itemId: string, quantity: number) {
    return this.http.put<Cart>(
      `/api/cart/demo-cart/items/${itemId}`,
      {
        quantity,
      }
    );
  }

  deleteCartItem(itemId: string) {
    return this.http.delete<Cart>(
      `/api/cart/demo-cart/items/${itemId}`
    );
  }

  createOrder(cartId: string) {
    return this.http.post<import('../models/order.model').Order>(
      '/api/orders',
      {
        cartId,
      }
    );
  }
}