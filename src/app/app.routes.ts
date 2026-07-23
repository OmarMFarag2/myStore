import { Routes } from '@angular/router';
import { Products } from './dashboard/products/products';
import { Categories } from './dashboard/categories/categories';
import { ProductList } from './frontend/product-list/product-list';
import { Category } from './frontend/category/category';
import { Frontend } from './frontend/frontend';
import { Dashboard } from './dashboard/dashboard';
import { ProductDetails } from './frontend/product-details/product-details';
import { adminGuard } from './core/guards/admin-guard';
import { Order } from './dashboard/order/order';
import { Orders } from './frontend/orders/orders';
import { Cart } from './frontend/cart/cart';

export const routes: Routes = [
    {path:"dashboard",component:Dashboard,canActivate:[adminGuard],children:[
        {path:"",component:Products},
        {path:"categories",component:Categories},
        {path:"products",component:Products},
        {path:"orders",component:Order}
    ]},
    {path:"",component:Frontend,children:[
        {path:"",redirectTo:"products",pathMatch:'full'},
        {path:"products",component:ProductList},
        {path:"categories",component:Category},
        {path:'products/:slug',component:ProductDetails},
        {path:"orders",component:Orders},
        {path:"cart",component:Cart},


    ]}
];
