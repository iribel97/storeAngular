import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemAlsoComponent } from './cart-item-also.component';

describe('CartItemAlsoComponent', () => {
  let component: CartItemAlsoComponent;
  let fixture: ComponentFixture<CartItemAlsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemAlsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartItemAlsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
