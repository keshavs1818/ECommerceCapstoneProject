import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { SalesComponent } from './sales/sales.component';
import { StocksComponent } from './stocks/stocks.component';
import { UserComponent } from './user/user.component';
import { CreateuserComponent } from './createuser/createuser.component';

const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',component:CartComponent},
  {path:'wishlist',component:WishlistComponent},
  {path:'sales',component:SalesComponent},
  {path:'stocks',component:StocksComponent},
  {path:'users',component:UserComponent},
  {path:'createuser',component:CreateuserComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
