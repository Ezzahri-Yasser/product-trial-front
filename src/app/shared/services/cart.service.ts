import { Injectable } from '@angular/core';
import { Product } from 'app/products/data-access/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);  
  cart$ = this.cartSubject.asObservable();  
  
  addToCart(product: Product) {
    const currentCart = this.cartSubject.value;
    const updatedCart = [...currentCart, product];
    this.cartSubject.next(updatedCart); 
  }

  
  removeFromCart(product: Product) {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(p => p.id !== product.id);
    this.cartSubject.next(updatedCart);  
  }
}
