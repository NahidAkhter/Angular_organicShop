import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from './../../category.service';
import { Category } from './../../models/category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories: Category[];
  @Input('category') category;

  constructor(categoryService: CategoryService) {
    categoryService.getAll().subscribe(c => this.categories = c);
  }

  ngOnInit(): void {
  }

}
