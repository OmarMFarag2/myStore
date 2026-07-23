import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductApi } from '../../core/services/product-api';
import { ProductList } from '../../frontend/product-list/product-list';
import { IProductList } from '../../core/models/product-list';

@Component({
  selector: 'app-product',
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Product implements OnInit {

  productForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private productService: ProductApi
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      products: this.fb.array([])
    });

    this.getProducts();
  }

  get products(): FormArray {
    return this.productForm.get('products') as FormArray;
  }

  createProduct(product?: IProductList): FormGroup {
    return this.fb.group({
      _id: [product?._id || null],
      name: [product?.name || '', Validators.required],
      price: [product?.price || 0, [Validators.required, Validators.min(1)]],
      stock: [product?.stock || 0, [Validators.required, Validators.min(0)]],
      desc: [product?.desc || ''],
      category: [product?.category || '', Validators.required]
    });
  }

  getProducts() {
    this.loading = true;

    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products.clear();

        products.forEach(product => {
          this.products.push(this.createProduct(product));
        });

        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    });
  }

  addProduct() {
    this.products.push(this.createProduct());
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }

  saveProduct(index: number) {

    const product = this.products.at(index).value;

    if (product._id) {

      this.productService.updateProduct(product._id, product).subscribe({
        next: () => console.log('Updated'),
        error: err => console.log(err)
      });

    } else {

      this.productService.addProduct(product).subscribe({
        next: (newProduct: Product) => {
          this.products.at(index).patchValue({
            _id: newProduct._id
          });
        },
        error: err => console.log(err)
      });

    }
  }
}