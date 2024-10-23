import {
  Component,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./products/features/product-list/product-list.component";
import { Product } from 'app/products/data-access/product.model';
import { CartService } from "./shared/services/cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, ReactiveFormsModule, CommonModule, ProductListComponent, FormsModule],
})
export class AppComponent {
  title = "ALTEN SHOP";
  cart: Product[] = [];
  cartVisible: boolean = false;  // Controls visibility of the cart
  constructor(private cartService: CartService) {} 

  ngOnInit(): void {
    // Subscribe to cart changes
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  // Toggle the visibility of the cart dropdown
  toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  updateQuantity(product: Product, newQuantity: number) {
    if (newQuantity > product.quantity) {
      alert('Cannot exceed available stock');
      return;
    }
    product.quantity = newQuantity;  // Update the product quantity in the cart
  }

  // Remove a product from the cart
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);  // Remove product via CartService
  }
}
