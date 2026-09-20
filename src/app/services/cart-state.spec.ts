import { TestBed } from '@angular/core/testing';
import { CartState } from './cart-state';
import { Cart } from '../models/cart.model';

describe('CartState', () => {
  let cartState: CartState;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    cartState = TestBed.inject(CartState);
  });

  it('should update the cart after adding an item', () => {
    const cart: Cart = {
      id: 'demo-cart',
      items: [
        {
          id: '1',
          drink: {
            id: '2',
            name: 'Latte',
            price: 5,
          },
          toppings: [],
          quantity: 1,
          unitPrice: 5,
        },
      ],
      subtotal: 5,
      discount: 0,
      promotion: '',
      total: 5,
    };

    cartState.setCart(cart);

    expect(cartState.cart()?.items.length).toBe(1);
    expect(cartState.cart()?.items[0].drink.name).toBe('Latte');
  });
});