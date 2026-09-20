import {
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { Cart } from '../models/cart.model';
import { drinks, toppings } from '../mock/mock-data';

let mockCart: Cart = {
  id: 'demo-cart',
  items: [],
  subtotal: 0,
  discount: 0,
  promotion: '',
  total: 0,
};

function calculateCartTotals(cart: Cart): Cart {
  const subtotal = cart.items.reduce(
    (sum, item) =>
      sum + item.unitPrice * item.quantity,
    0
  );

  // Promotion 1:
  // €12 or more = 25% discount
  const percentageDiscount =
    subtotal >= 12
      ? subtotal * 0.25
      : 0;

  // Promotion 2:
  // 3 or more drinks = cheapest drink (including toppings) free
  const drinkCount = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cheapestDrinkDiscount =
    drinkCount >= 3 && cart.items.length > 0
      ? Math.min(
          ...cart.items.map((item) => item.unitPrice)
        )
      : 0;

  // If both promotions apply,
  // use the one that gives the bigger discount.
  const discount = Math.max(
    percentageDiscount,
    cheapestDrinkDiscount
  );

  let promotion = '';

  if (percentageDiscount > cheapestDrinkDiscount) {
    promotion = '25% off orders over €12';
  } else if (cheapestDrinkDiscount > percentageDiscount) {
    promotion = 'Cheapest drink free';
  } else if (percentageDiscount > 0) {
    promotion = '25% off orders over €12';
  }

  return {
    ...cart,
    subtotal,
    discount: Number(discount.toFixed(2)),
    promotion,
    total: Number((subtotal - discount).toFixed(2)),
  };
}

export function mockApiInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {

  // --------------------
  // DRINKS
  // --------------------

  if (req.method === 'GET' && req.url === '/api/drinks') {
    return of(
      new HttpResponse({
        status: 200,
        body: drinks,
      })
    );

    // Throw Drinks Load Error
    // return throwError(() => new Error('Unable to load drinks'));
  }

    // DRINKS - POST

  if (
    req.method === 'POST' &&
    req.url === '/api/drinks'
  ) {
    const body = req.body as {
      name: string;
      price: number;
    };

    if (!body.name || body.price <= 0) {
      return throwError(
        () => new Error('Invalid drink')
      );
    }

    const newDrink = {
      id: String(
        Math.max(
          ...drinks.map((drink) => Number(drink.id))
        ) + 1
      ),
      name: body.name,
      price: body.price,
    };

    drinks.push(newDrink);

    return of(
      new HttpResponse({
        status: 201,
        body: newDrink,
      })
    );
  }

  // DRINKS - PUT

  if (
    req.method === 'PUT' &&
    req.url.startsWith('/api/drinks/')
  ) {
    const id = req.url.split('/').pop();

    const body = req.body as {
      name: string;
      price: number;
    };

    if (!body.name || body.price <= 0) {
      return throwError(
        () => new Error('Invalid drink')
      );
    }

    const index = drinks.findIndex(
      (drink) => drink.id === id
    );

    if (index === -1) {
      return of(
        new HttpResponse({
          status: 404,
          body: {
            message: 'Drink not found',
          },
        })
      );
    }

    drinks[index] = {
      id: id!,
      name: body.name,
      price: body.price,
    };

    return of(
      new HttpResponse({
        status: 200,
        body: drinks[index],
      })
    );
  }

  // DRINKS - DELETE

  if (
    req.method === 'DELETE' &&
    req.url.startsWith('/api/drinks/')
  ) {
    const id = req.url.split('/').pop();

    const index = drinks.findIndex(
      (drink) => drink.id === id
    );

    if (index === -1) {
      return of(
        new HttpResponse({
          status: 404,
          body: {
            message: 'Drink not found',
          },
        })
      );
    }

    drinks.splice(index, 1);

    return of(
      new HttpResponse({
        status: 204,
      })
    );
  }

  // --------------------
  // TOPPINGS
  // --------------------

  if (req.method === 'GET' && req.url === '/api/toppings') {
    return of(
      new HttpResponse({
        status: 200,
        body: toppings,
      })
    );

    // Throw Toppings Load Error
    // return throwError(() => new Error('Unable to load toppings'));
  }

    // TOPPINGS - POST

  if (
    req.method === 'POST' &&
    req.url === '/api/toppings'
  ) {
    const body = req.body as {
      name: string;
      price: number;
    };

    if (!body.name || body.price <= 0) {
      return throwError(
        () => new Error('Invalid topping')
      );
    }

    const newTopping = {
      id: String(
        Math.max(
          ...toppings.map((topping) => Number(topping.id))
        ) + 1
      ),
      name: body.name,
      price: body.price,
    };

    toppings.push(newTopping);

    return of(
      new HttpResponse({
        status: 201,
        body: newTopping,
      })
    );
  }

    // TOPPINGS - PUT

  if (
    req.method === 'PUT' &&
    req.url.startsWith('/api/toppings/')
  ) {
    const id = req.url.split('/').pop();

    const body = req.body as {
      name: string;
      price: number;
    };

    if (!body.name || body.price <= 0) {
      return throwError(
        () => new Error('Invalid topping')
      );
    }

    const index = toppings.findIndex(
      (topping) => topping.id === id
    );

    if (index === -1) {
      return of(
        new HttpResponse({
          status: 404,
          body: {
            message: 'Topping not found',
          },
        })
      );
    }

    toppings[index] = {
      id: id!,
      name: body.name,
      price: body.price,
    };

    return of(
      new HttpResponse({
        status: 200,
        body: toppings[index],
      })
    );
  }

  // TOPPINGS - DELETE

  if (
    req.method === 'DELETE' &&
    req.url.startsWith('/api/toppings/')
  ) {
    const id = req.url.split('/').pop();

    const index = toppings.findIndex(
      (topping) => topping.id === id
    );

    if (index === -1) {
      return of(
        new HttpResponse({
          status: 404,
          body: {
            message: 'Topping not found',
          },
        })
      );
    }

    toppings.splice(index, 1);

    return of(
      new HttpResponse({
        status: 204,
      })
    );
  }

  // --------------------
  // CART - GET
  // --------------------

  if (
    req.method === 'GET' &&
    req.url === '/api/cart/demo-cart'
  ) {
    return of(
      new HttpResponse({
        status: 200,
        body: mockCart,
      })
    );
  }

  // --------------------
  // CART - POST
  // --------------------

  if (
    req.method === 'POST' &&
    req.url === '/api/cart/demo-cart/items'
  ) {
    const body = req.body as {
      drinkId: string;
      toppingIds: string[];
    };

    const drink = drinks.find(
      (item) => item.id === body.drinkId
    );

    if (!drink) {
      return of(
        new HttpResponse({
          status: 400,
          body: {
            message: 'Drink not found',
          },
        })
      );
    }

    const selectedToppings = toppings.filter((topping) =>
      body.toppingIds.includes(topping.id)
    );

    const unitPrice =
      drink.price +
      selectedToppings.reduce(
        (sum, topping) => sum + topping.price,
        0
      );

    const existingItem = mockCart.items.find(
      (item) =>
        item.drink.id === drink.id &&
        JSON.stringify(
          item.toppings
            .map((topping) => topping.id)
            .sort()
        ) ===
        JSON.stringify(
          [...body.toppingIds].sort()
        )
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      mockCart.items.push({
        id: String(mockCart.items.length + 1),
        drink,
        toppings: selectedToppings,
        quantity: 1,
        unitPrice,
      });
    }

    mockCart = calculateCartTotals(mockCart);

    return of(
      new HttpResponse({
        status: 200,
        body: mockCart,
      })
    );
  }

  // --------------------
  // CART - PUT
  // --------------------

  if (
    req.method === 'PUT' &&
    req.url.startsWith('/api/cart/demo-cart/items/')
  ) {
    const itemId = req.url.split('/').pop();

    const body = req.body as {
      quantity: number;
    };

    const item = mockCart.items.find(
      (item) => item.id === itemId
    );

    if (!item) {
      return of(
        new HttpResponse({
          status: 404,
          body: {
            message: 'Cart item not found',
          },
        })
      );
    }

    if (body.quantity < 1) {
      return of(
        new HttpResponse({
          status: 400,
          body: {
            message: 'Quantity must be at least 1',
          },
        })
      );
    }

    item.quantity = body.quantity;

    mockCart = calculateCartTotals(mockCart);

    return of(
      new HttpResponse({
        status: 200,
        body: mockCart,
      })
    );
  }

  // --------------------
  // CART - DELETE
  // --------------------

  if (
    req.method === 'DELETE' &&
    req.url.startsWith('/api/cart/demo-cart/items/')
  ) {
    const itemId = req.url.split('/').pop();

    const itemIndex = mockCart.items.findIndex(
      (item) => item.id === itemId
    );

    if (itemIndex === -1) {
      return of(
        new HttpResponse({
          status: 404,
          body: {
            message: 'Cart item not found',
          },
        })
      );
    }

    mockCart.items.splice(itemIndex, 1);

    mockCart = calculateCartTotals(mockCart);

    return of(
      new HttpResponse({
        status: 200,
        body: mockCart,
      })
    );
  }

  // --------------------
  // ORDERS - POST
  // --------------------

  if (
    req.method === 'POST' &&
    req.url === '/api/orders'
  ) {
    if (mockCart.items.length === 0) {
      return throwError(
        () => new Error('Cart is empty')
      );
    }

    const order = {
      id: `order-${Date.now()}`,
      total: mockCart.total,
    };

    return of(
      new HttpResponse({
        status: 201,
        body: order,
      })
    );
  }


  return next(req);
}