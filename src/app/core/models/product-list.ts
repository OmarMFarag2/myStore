import { ICategory } from "./icategory";
import { ISubCategory } from "./isub-category";

export interface IProductList {
  _id: string;
  name: string;
  price: number;
  desc: string;
  imgs: string[];
  stock: number;
  category: ICategory;
  subCategory: ISubCategory;
  slug: string;
  isRecent: boolean;
  isDeleted: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface IProductListRes{
    data:IProductList[]
}
