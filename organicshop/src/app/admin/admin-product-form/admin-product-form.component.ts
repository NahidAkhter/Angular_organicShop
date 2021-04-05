import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { CategoryService } from './../../category.service';
import { ProductService } from './../../product.service';


@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  categories;
  product: any = {};
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

    categoryService.getAll().subscribe(c => this.categories = c);

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) { this.productService.get(this.id).valueChanges().subscribe(p => this.product = p); }

  }

  save(product) {

    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    // tslint:disable-next-line:curly
    if (!confirm('Are you sure you want to delete this products?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
