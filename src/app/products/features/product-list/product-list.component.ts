import { CommonModule } from "@angular/common";
import { Component, OnInit, Output, EventEmitter, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { CartService } from "app/shared/services/cart.service";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [DataViewModule, CardModule, ButtonModule, DialogModule, ProductFormComponent, CommonModule, FormsModule],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  filteredProducts: Product[] = [];
  selectedCategory: string = '';  
  public cart: Product[] = [];  
  private readonly cartService = inject(CartService); 
  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe(() => {
      this.filterByCategory();  
    });
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
    this.filterByCategory();  
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0); 
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);  
  }
  filterByCategory() {
    if (this.selectedCategory === '') {
      this.filteredProducts = this.products();  
    } else {
      this.filteredProducts = this.products().filter(product => product.category === this.selectedCategory);
    }
  }
  public addToCart(product: Product) {
    const foundProduct = this.cart.find(p => p.id === product.id);
    if (!foundProduct) {
      this.cart.push(product);
      this.cartService.addToCart(product);
        } else {
      alert("Product is already in the cart!");
    }
  }

  public removeFromCart(product: Product) {
    this.cart = this.cart.filter(p => p.id !== product.id);
    this.cartService.removeFromCart(product); 
    }
}
