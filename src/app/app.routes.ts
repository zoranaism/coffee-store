import { Routes } from '@angular/router';

import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart';
import { Checkout } from './pages/checkout/checkout';
import { Admin } from './pages/admin/admin';
import { AdminDrinks } from './pages/admin-drinks/admin-drinks';
import { AdminDrinkForm } from './pages/admin-drink-form/admin-drink-form';
import { AdminToppings } from './pages/admin-toppings/admin-toppings';
import { AdminToppingForm } from './pages/admin-topping-form/admin-topping-form';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full',
  },

  { path: 'shop', component: Shop },
  { path: 'cart', component: Cart },
  { path: 'checkout', component: Checkout },

  { path: 'admin', component: Admin },
  { path: 'admin/drinks', component: AdminDrinks },
  { path: 'admin/drinks/new', component: AdminDrinkForm },
  { path: 'admin/drinks/:id/edit', component: AdminDrinkForm },

  { path: 'admin/toppings', component: AdminToppings },
  { path: 'admin/toppings/new', component: AdminToppingForm },
  { path: 'admin/toppings/:id/edit', component: AdminToppingForm },
];