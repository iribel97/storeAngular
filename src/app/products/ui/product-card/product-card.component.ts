import { Component, input, output } from '@angular/core';
import { Product } from './../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {

  product = input.required<Product>();

  selectProduct = output<Product>();

  addToCart(event:Event){
    event.stopPropagation();
    event.preventDefault();
    this.selectProduct.emit(this.product());
  }

}
