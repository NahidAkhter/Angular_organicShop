import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppProduct } from './../models/app-product';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: AppProduct[] = [];
  filteredProduct: AppProduct[];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(route: ActivatedRoute, productService: ProductService, private shoppingCartService: ShoppingCartService) {
    productService.getAll().switchMap(product => {
      this.products = product;
      return route.queryParamMap;
    }).subscribe(params => {
      this.category = params.get('category');

      this.filteredProduct = this.category ? this.products.filter(p => p.category === this.category) : this.products;
      console.log(this.filteredProduct);
    });

}
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
 async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(shopCart => this.cart = shopCart);
  }



}
