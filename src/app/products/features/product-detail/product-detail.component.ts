import { Component, effect, inject, input} from '@angular/core';
import { ProductDetailStateService } from '../../data-access/product-detail-state.service';
import { CurrencyPipe } from '@angular/common';
import { CartStateService } from '../../../shared/data-access/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  providers: [ProductDetailStateService],
})
export default class ProductDetailComponent {

  productDetail = inject(ProductDetailStateService).state;
  cartState = inject(CartStateService).state

  id = input.required<number>();

  constructor() {
    effect(() => {
      this.productDetail.getById(this.id());
    });
  }

  addToCart(){
    this.cartState.add({
      product: this.productDetail.product()!,
      quantity: 1
    });
  }
}
