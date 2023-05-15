import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CategorysComponent } from './pages/categorys/categorys.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';


//Se establecen las rutas para los componentes generados en el folder pages
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "home", component: HomeComponent, pathMatch: 'full' },
  { path: "categorys", component: CategorysComponent, pathMatch: 'full' },
  { path: "products", component: ProductsComponent, pathMatch: 'full' },
  { path: "products/:category", component: ProductsComponent, pathMatch: 'full' },
  { path: "product/:id", component: ProductComponent, pathMatch: 'full' },
  { path: "cart", component: CartComponent, pathMatch: 'full' },
  { path: "**", component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
