import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCart } from 'src/app/models/Product';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  quantity: number;
  @Input() cartItem: ProductCart;
  @Output() updateTotal = new EventEmitter();

  constructor(private orderService: OrderService, private router: Router) {
  }
  ngOnInit(): void {
    this.quantity = this.cartItem.quantity;
  }

  add() {
    this.quantity++;
    this.cartItem.quantity = this.quantity;
    this.orderService.update(this.cartItem)
    this.updateTotal.emit();
  }

  remove() {
    this.quantity--;
    this.cartItem.quantity = this.quantity;
    this.orderService.update(this.cartItem)
    this.updateTotal.emit();
  }

  updateCart(){
    this.cartItem.quantity = this.quantity;
    this.orderService.update(this.cartItem);
    this.updateTotal.emit();
  }

  
}
