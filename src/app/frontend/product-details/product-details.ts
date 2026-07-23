import { ChangeDetectorRef, Component } from '@angular/core';
import { IProductList } from '../../core/models/product-list';
import { ProductApi } from '../../core/services/product-api';
import { ActivatedRoute } from '@angular/router';
import { env } from '../../../env/env';
import { Auth } from '../../core/services/auth';
import { CurrencyPipe } from '@angular/common';
import { Cart } from '../../core/services/cart';
import { ICart } from '../../core/models/cart';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product!: IProductList;
  imgPath: string = env.staticURL;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductApi,
    private _cart: Cart,
    private _cdr: ChangeDetectorRef,
    private _auth: Auth,
  ) {}

  staticURL = env.staticURL;
  addToCart(id: string, quantity: number = 1): void {
    const token = this._auth.getToken();
    if (token) {
      const isLoggedIn = this._auth.jwtDecoding(token);

      if (isLoggedIn) {
        this._cart.saveCart(this.product._id, quantity).subscribe();
        return;
      }
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find((i:ICart) => i.items.product._id === this.product._id);

    if (item) {
      item.quantity += quantity;
    } else {
      cart.push({
        productId: this.product._id,
        name: this.product.name,
        price: this.product.price,
        image: this.product.imgs[0],
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }
  ngOnInit(): void {
    const slug = this._activatedRoute.snapshot.paramMap.get('slug');
    if (slug) {
      this._productService.getProductBySlug(slug).subscribe({
        next: (res) => {
          this.product = res;
          console.log(this.product);

          this._cdr.detectChanges();
        },
        error: (err) => console.log(err),
      });
      this._cdr.detectChanges();
      console.log(slug);
    }
  }
}
