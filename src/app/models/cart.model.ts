import { Drink } from './drink.model';
import { Topping } from './topping.model';

export interface CartItem {
  id: string;
  drink: Drink;
  toppings: Topping[];
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  promotion?: string;
  total: number;
}