import { inject, Injectable, Signal } from "@angular/core";
import { ProductItemCart } from "../interfaces/product.interface";
import { signalSlice } from "ngxtension/signal-slice";
import { StoreageService } from "./storeage.service";
import { map, Observable } from "rxjs";

interface State {
    products: ProductItemCart[];
    loaded: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class CartStateService {

    private _storageService = inject(StoreageService);

    private initialState: State = {
        products: [],
        loaded: false,
    };

    loadProducts$ = this._storageService.loadProducts().pipe(
        map(products => ({ products, loaded: true })),
    )

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.loadProducts$
        ],
        selectors: (state) => ({
            count: () => state().products.reduce((acc, product) => acc + product.quantity, 0),
            price: () => state().products.reduce((acc, product) => acc + product.product.price * product.quantity, 0),
          }),
        actionSources: {
            add: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                    map((product) => this.add(state, product)),
                ),
            remove: (state, action$: Observable<number>) =>
                action$.pipe(
                    map((id) => ({
                        products: state().products.filter(p => p.product.id !== id),
                    })),
                ),
            update: (state, action$: Observable<ProductItemCart>) =>
                action$.pipe(
                    map((product) => this.updateState(state, product)),
                ),
        },
        effects: (state) => ({
            load: () => {
                if (state().loaded) {
                    this._storageService.saveProducts(state().products);
                };
            }
        })
    });

    private add(state: Signal<State>, product: ProductItemCart) {

        const isInCart = state().products.find(p => p.product.id === product.product.id);

        if (!isInCart) {
            return {
                products: [...state().products, { ...product, quantity: 1 }

                ]
            };

        }

        isInCart.quantity += 1;
        return {
            products: [...state().products],
        }
    }

    private updateState(state: Signal<State>, product: ProductItemCart) {
    
        const products = state().products.map((productInCart) => {
            if (productInCart.product.id === product.product.id) {
                return {...productInCart, quantity: product.quantity};
            }
    
            return productInCart;
        });
    
        return { products };
    }

}
