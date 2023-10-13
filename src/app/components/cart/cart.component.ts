import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: ProductCart[] = [];
  total: number = 0;
  @Output() checkout = new EventEmitter();
  constructor(private orderService: OrderService, private router: Router) {
  }
  ngOnInit(): void {
    this.carts = this.orderService.getCarts();
    this.onUpdateTotal();
  }

  onUpdateTotal() {
    this.carts = this.orderService.getCarts();
    this.total = this.carts.map( item => item.price * item.quantity).reduce((partialSum, a) => partialSum + a, 0);
  }

  onSubmit = (value: any) => {
    window.localStorage.clear();
    this.router.navigate([`/success`], {queryParams: { name: value.fullname, total: this.total}});
  }
}
