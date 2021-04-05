import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AppProduct } from './models/app-product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  items: string;
  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push(
      {
        dateCreated: new Date().getTime()
      }
    );
  }

  async getCart() {
    let cartId = await this.getCreateCartid();
    return this.db.object('shopping-carts' + cartId);
  }

  private getItem( cartId: string, productId: string) {
    return this.db.object('shopping-carts' + cartId + '/items' + productId);
  }

  private async getCreateCartid() {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: AppProduct) {
    let cartId = await this.getCreateCartid();
    let item$: any = this.getItem(cartId, product.id);

    item$.valueChanges().take(1).subscribe(item => {
      if (item) { item$.update({ quantity: item.quantity + 1 }); }
      else {
        item$.set({ product, quantity: 1 });
      }

    });
  }
}
