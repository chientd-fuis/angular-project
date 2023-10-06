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
    this.onTotal();
  }
  
  add(productId: number) {
    const item = this.carts.find(p => p.id === productId);
    if(item) {
      item.quantity = item.quantity + 1;
      this.orderService.update(item)
      this.onTotal();
    }
  }

  remove(productId: number) {
    const item = this.carts.find(p => p.id === productId);
    if(item) {
      
        item.quantity = item.quantity - 1;
        this.orderService.update(item)
        this.onTotal();
        if(item.quantity <= 0){
          this.refresh();
        }
    }
  }

  refresh = () => window.location.reload();

  onTotal() {
    this.total = this.carts.map( item => item.price * item.quantity).reduce((partialSum, a) => partialSum + a, 0);
  }

  onSubmit = (value: any) => {
    window.localStorage.clear();
    this.router.navigate([`/success/${value.fullname}/${this.total}`]);
  }
}
