import { Injectable } from '@angular/core';
import { IOrder, IPlaceOrder } from '../models/iorder';
import { env } from '../../../env/env';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Order {
    constructor(private _http: HttpClient) {}

  private apiURL = env.apiURL + 'order';

  getAllOrders() {
    return this._http.get<IOrder>(this.apiURL);
  }
   placeOrder(data:IPlaceOrder) {
    return this._http.post<IOrder>(this.apiURL,data);
  }

  getMyOrders(id:string) {
    return this._http.get<IOrder>(this.apiURL + '/' + id);
  }
}
