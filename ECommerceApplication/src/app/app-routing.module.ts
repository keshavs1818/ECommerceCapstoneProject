import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { StocksComponent } from './stocks/stocks.component';
import { SalesComponent } from './sales/sales.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'stocks',component:StocksComponent},
  {path:'sales',component:SalesComponent},
  {path:'cart', component:CartComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'user',component:UserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
