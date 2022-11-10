import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT:{ [id:number]: number } = {1: 400, 3:335, 4:350}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',

})
export class HomeComponent implements OnInit {
  cols = 3;
  rowHeight =  ROWS_HEIGHT[this.cols];
  category: string | undefined;

  constructor(private cartSercie : CartService) { }

  ngOnInit(): void {
  }

  OnColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.  rowHeight =  ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    console.log('parent', newCategory)
  }

  onAddToCart(product: Product): void {
    this.cartSercie.addToCart({
      product: product.image,
      name: product.tittle,
      price: product.price,
      quantity: 1, 
      id: product.id
    })
  }
}
