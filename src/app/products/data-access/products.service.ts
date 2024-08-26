import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseHttpService } from "../../shared/data-access/base-http.service";
import { Observable } from "rxjs";
import { Product } from "../../shared/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})
export class ProductsService extends BaseHttpService{

    getProducts(page: number, num: number):Observable<Product[]> {
        return this.http.get<any[]>(`${this.apiUrl}/products`, {
            params: {
                offset:page * num,
                limit: num,
            }
        });
    }

    getProduct(id: number):Observable<Product> {
        return this.http.get<any>(`${this.apiUrl}/products/${id}`);
    }
}