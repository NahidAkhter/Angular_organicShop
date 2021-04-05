import { stringify } from '@angular/compiler/src/util';
import { Component, Input } from '@angular/core';
import { AppProduct } from './../models/app-product';
import { ShoppingCartService } from './../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: AppProduct;
  // tslint:disable-next-line:no-input-rename
  @Input('show-actions') showActions = true;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart(product: AppProduct) {
    this.cartService.addToCart(product);
  }


  getQuantity() {
    if(!this.shoppingCart) return 0;

    console.log("item------>" + typeof this.shoppingCart.items[this.product.id]);
    let item = this.shoppingCart.items[this.product.id];
    return item ? item.quantity : 0;
  }
}