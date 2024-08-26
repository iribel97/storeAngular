import { Component, inject, input } from '@angular/core';
import { ProductsAlsoService } from '../../data-access/products-also.service';
import { RouterLink } from '@angular/router';
import { Product } from '../../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item-also',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart-item-also.component.html',
  providers: [ProductsAlsoService],
})
export class CartItemAlsoComponent {

  product = input.required<Product>();

  productsState = inject(ProductsAlsoService);

}
