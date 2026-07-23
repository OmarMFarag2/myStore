import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { ICart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class Cart {
    constructor(private _http: HttpClient) {}

  private apiURL = env.apiURL + 'cart';

  getCart() {
    return this._http.get<ICart>(this.apiURL);
  }

  saveCart(id:string,quantity:number) {
    return this._http.post<ICart>(this.apiURL +"/saveCart",{id,quantity});
  }
}
