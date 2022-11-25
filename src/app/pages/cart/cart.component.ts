import { HttpClient } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { loadStripe } from '@stripe/stripe-js';
import { TitleStrategy } from "@angular/router";
import { Cart, CartItem } from "src/app/models/cart";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styles: [],
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [
      {
        id: 1,
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 1,
      },
      {
        id: 2,
        product: "https://via.placeholder.com/150",
        name: "snickers",
        price: 150,
        quantity: 2,
      },
    ],
  };

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveCart(item: CartItem ): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51M85zREpttGYcz0OtoGodDxw0TRPI1O4w8KubJQ4UOmomrvm1ERQqCbSOf0HBGp3RaodSeZf43uH6QGtOwNZRXkP00iiE2xxcw');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
