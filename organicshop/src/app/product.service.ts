import { Observable } from 'rxjs';
import { AppProduct } from './models/app-product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<AppProduct[]> {
    return this.db.list<AppProduct>('/products').snapshotChanges()
    .pipe(
      map(changes =>
        changes.map( c => {
          const data = c.payload.val() as AppProduct;
          const id = c.payload.key;
          return { id, ...data };
        }

        ))
    );

  }

  get(productId) {
   return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
