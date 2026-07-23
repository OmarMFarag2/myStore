
import { IProductList } from "./product-list";
import { User } from "./user";

export interface ICart {
    user:User
    items:{
        product:IProductList
        quantity:number
    }
}
