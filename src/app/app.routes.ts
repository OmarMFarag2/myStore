import { Routes } from '@angular/router';
import { Products } from './dashboard/products/products';
import { Categories } from './dashboard/categories/categories';
import { ProductList } from './frontend/product-list/product-list';
import { Category } from './frontend/category/category';
import { Frontend } from './frontend/frontend';
import { Dashboard } from './dashboard/dashboard';
import { ProductDetails } from './frontend/product-details/product-details';

export const routes: Routes = [
    {path:"dashboard",component:Dashboard,children:[
        {path:"",component:Products},
        {path:"categories",component:Categories},
        // {path:"",component:Products},
        // {path:"",component:Products}
    ]},
    {path:"",component:Frontend,children:[
        {path:"",redirectTo:"products",pathMatch:'full'},
        {path:"products",component:ProductList},
        {path:"categories",component:Category},
        {path:'products/:slug',component:ProductDetails}
        // {path:"",component:Products},
        // {path:"",component:Products}
    ]}
];
