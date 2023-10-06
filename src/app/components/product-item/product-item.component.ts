import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product';
import {MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product

  quantity: number = 1;

  constructor(private _snackBar: MatSnackBar, private orderService: OrderService) {
  }

  addToCart() {
    if(this.quantity > 0){
      const item = {...this.product, quantity: this.quantity}
      this.orderService.add(item)
      this._snackBar.open(`${this.quantity} ${this.product.name} has been added to cart!🎉`, 'Close', {
        duration: 3000
      });
    }
  }

  add() {
    ++this.quantity;
  }

  remove() {
    if(this.quantity>1) {
      --this.quantity;
    }
  }


}
