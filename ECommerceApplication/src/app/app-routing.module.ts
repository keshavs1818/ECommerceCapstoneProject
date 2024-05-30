import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { StocksComponent } from './stocks/stocks.component';
import { SalesComponent } from './sales/sales.component';
import { LoginComponent } from './login/login.component';

// guards against non authorized route usage
import { adminGuard } from './auth/admin.guard';
import { userGuard } from './auth/user.guard';

import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  // if you want the route to be accessible only by certain authorities,
  // adminGuard: admins only, // userGuard: both users and admin (but have to be logged in)
  {path:'home',component:HomeComponent, canActivate: [adminGuard]},
  {path:'register',component:RegisterComponent},
  {path:'stocks',component:StocksComponent, canActivate: [adminGuard]},
  {path:'sales',component:SalesComponent, canActivate: [adminGuard]},
  {path:'login', component:LoginComponent},
  // {path: '', redirectTo: '/login', pathMatch: 'full' }

  {path:'cart', component:CartComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'user',component:UserComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
