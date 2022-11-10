import { Component, Input, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = {items: []};
  itemQuantity = 0;

@Input()
get cart(): Cart {
  return this._cart;
}

set cart(cart: Cart) {
  this._cart = cart;

  this.itemQuantity = cart.items
    .map((item) => item.quantity)
    .reduce((prev, current) => prev + current, 0);
}

  constructor() { }

  ngOnInit(): void {
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

}
