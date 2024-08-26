import { inject, Injectable } from "@angular/core";
import { Product } from "../../shared/interfaces/product.interface";
import { ProductsService } from "../../products/data-access/products.service";
import { catchError, map, of, startWith, Subject, switchMap } from "rxjs";
import { signalSlice } from "ngxtension/signal-slice";

interface State {
    products: Product[];
    status: 'loading' | 'success' | 'error';
    page: number;
}

@Injectable()
export class ProductsAlsoService {
    private productsService = inject(ProductsService);

    private initialState: State = {
        products: [],
        status: 'loading' as const,
        page: 0,
    };

    changePages$ = new Subject<number>();

    loadProducts$ = this.changePages$.pipe(
        startWith(0),
        switchMap((page) => this.productsService.getProducts(page, 3)),
        map(products => ({ products, status: 'success' as const })),
        catchError(() => of({ 
            products: [],
            status: 'error' as const,
         })),
    );

    state = signalSlice({
        initialState: this.initialState,
        sources: [
            this.changePages$.pipe(
                map(page => ({ page, status: 'loading' as const }))
            ),
            this.loadProducts$
        ]
    });

}