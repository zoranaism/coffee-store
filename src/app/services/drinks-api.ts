import { Injectable } from '@angular/core';
import { Drink } from '../models/drink.model';
import { drinks } from '../mock/mock-data';

@Injectable({
  providedIn: 'root',
})
export class DrinksApi {
  getDrinks(): Drink[] {
    return drinks;
  }
}