import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { Ireview } from '../models/ireview';

@Injectable({
  providedIn: 'root',
})
export class Review {
      constructor(private _http: HttpClient) {}

  private apiURL = env.apiURL + 'cart';

  getCart() {
    return this._http.get<Ireview>(this.apiURL);
  }

  addReview(id:string,quantity:number) {
    return this._http.post<Ireview>(this.apiURL +"/saveCart",id);
  }
}
