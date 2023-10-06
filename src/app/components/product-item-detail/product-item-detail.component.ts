import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product, ProductCart } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit, OnDestroy {

  private unsubcribe = new Subject<void>();
  
  constructor(private route: ActivatedRoute,
    private service: ProductService,
    private orderService: OrderService,
    private _snackBar: MatSnackBar){}

  product: Product = {
    id: 0,
    name: '',
    price: 0,
    url: '',
    description : '',
  };
  quantity: number = 1;

  ngOnInit(): void {
    const {id} = this.route.snapshot.params;
    this.service.getProduct(parseInt(id))
    .pipe(takeUntil(this.unsubcribe))
    .subscribe(product => {
      if(product){
        this.product = product;
      }
    })
  }

  addToCart = () => {
    if(this.quantity > 0){
      const item = {...this.product, quantity: this.quantity} as ProductCart
      this.orderService.add(item);
      this._snackBar.open(`${this.quantity} ${this.product?.name} has been added to cart!🎉`, 'Close', {
        duration: 3000
      });
    }
  }

  add = () => this.quantity++;

  remove() {
    if(this.quantity>1) {
      --this.quantity;
    }
  }

  ngOnDestroy() {
    this.unsubcribe.next();
    this.unsubcribe.complete();
  }
}
