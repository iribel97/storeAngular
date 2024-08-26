import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CartItemAlsoComponent } from './ui/cart-item-also/cart-item-also.component';
import { ProductsAlsoService } from './data-access/products-also.service';
import { CartStateService } from '../shared/data-access/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartItemComponent, CartItemAlsoComponent, CurrencyPipe,],
  templateUrl: './cart.component.html',
  providers: [ProductsAlsoService,],
})
export default class CartComponent {

  productsState = inject(ProductsAlsoService);

  state = inject(CartStateService).state;

  onRemove(id: number) {
    this.state.remove(id);
  }

  onIncrease(product: ProductItemCart) {
    this.state.update({
      ...product,
      quantity: product.quantity + 1,
    });
  }

  onDecrease(product: ProductItemCart) {
    this.state.update({
      ...product,
      quantity: product.quantity - 1,
    });
  }

}
