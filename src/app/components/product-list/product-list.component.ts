import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  private unsubcribe = new Subject<void>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.productService.getProducts()
      .pipe(takeUntil(this.unsubcribe))
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnDestroy() {
    this.unsubcribe.next();
    this.unsubcribe.complete();
  }

}
