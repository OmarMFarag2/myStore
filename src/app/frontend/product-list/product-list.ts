import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductApi } from '../../core/services/product-api';
import { Subscription } from 'rxjs';
import { IProductList } from '../../core/models/product-list';
import { env } from '../../../env/env';
import { CurrencyPipe } from '@angular/common';
import { Product } from './product/product';


@Component({
  selector: 'app-product-list',
  imports: [Product],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit,OnDestroy{
  
  constructor(private _productService:ProductApi,private _cdr:ChangeDetectorRef){}
 
  productsList!:IProductList[]
  imgPath:string = env.staticURL

  private subscribtions:Subscription = new Subscription();
  ngOnInit(): void {
  
   const productsSub = this._productService.getAllProducts().subscribe({
      next: res=> {this.productsList = res.data;
        this._cdr.detectChanges();
        console.log(this.productsList);
        
      },
      error: err=> console.log(err)
    })
    this.subscribtions.add(productsSub);
  }

 ngOnDestroy(): void {
   this.subscribtions.unsubscribe();
  }
  addToCart(product:IProductList){}
}
