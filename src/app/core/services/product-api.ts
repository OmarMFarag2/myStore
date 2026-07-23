import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProductList, IProductListRes } from '../models/product-list';
import { env } from '../../../env/env';

@Injectable({
  providedIn: 'root',
})
export class ProductApi {
  constructor(private _http: HttpClient) {}

  private apiURL = env.apiURL + 'product';

  getAllProducts() {
    return this._http.get<IProductListRes>(this.apiURL);
  }

  getProductBySlug(slug: string) {
    return this._http.get<IProductList>(this.apiURL + '/' + slug);
  }
}
