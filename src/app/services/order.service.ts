import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCart } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  storage = window.localStorage;

  product: ProductCart[] = [];

  constructor() { 
      this.product = JSON.parse(this.storage.getItem('products') || '[]') ;
  }

  getCarts(): ProductCart[] {
    return JSON.parse(this.storage.getItem('products') || '[]') ;
  }

  add(product: ProductCart) {
    const item = this.product.find(p => p.id === product.id);
    let newList;
    if(item) {
      newList = this.product.map(p => {
        if(p.id === product.id) {
          p.quantity  += product.quantity;
            return p;
        } 
        return p;
      })
      .filter(p => p.quantity !=0);
    } else {
      this.product.push(product);
      newList = this.product;
    }
    console.log(newList)
    this.storage.setItem('products', JSON.stringify(newList));
  }

  update(product: ProductCart) {
    const item = this.product.find(p => p.id === product.id);
    let newList;
    if(item) {
      newList = this.product.map(p => {
        if(p.id === product.id) {
            return product;
        } 
        return p;
      })
      .filter(p => p.quantity !=0);
    } else {
      newList = this.product;
    }
    this.storage.setItem('products', JSON.stringify(newList));
  }
}
