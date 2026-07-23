import { Component, Input } from '@angular/core';
import { IProductList } from '../../../core/models/product-list';
import { env } from '../../../../env/env';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  @Input() product!:IProductList
    imgPath:string = env.staticURL
    addToCart(id:string){

    }
 test(asd:string){
  console.log(asd);
  
 }
}
