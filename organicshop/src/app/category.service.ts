import { Observable } from 'rxjs/internal/Observable';
import { AppProduct } from './models/app-product';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Category } from './models/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Category[]> {
    // return this.db.list('/categories', ref => ref.orderByChild('name'));

    return this.db.list<Category>('/categories').snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => {
            const data = c.payload.val() as Category;
            const id = c.payload.key;
            return { id, ...data };
          }

          ))
      );


  }
}
