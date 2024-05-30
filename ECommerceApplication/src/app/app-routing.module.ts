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


const routes: Routes = [
  // if you want the route to be accessible only by certain authorities,
  // adminGuard: admins only, // userGuard: both users and admin (but have to be logged in)
  {path:'home',component:HomeComponent, canActivate: [adminGuard]},
  {path:'register',component:RegisterComponent},
  {path:'stocks',component:StocksComponent},
  {path:'sales',component:SalesComponent},
  {path:'login', component:LoginComponent},
  // {path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
